export interface PointerPhysicsState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  active: boolean;
  rawX: number;
  rawY: number;
}

export class PointerTracker {
  private lastX = 0.5;
  private lastY = 0.5;
  private lastTime = 0;
  private targetVx = 0;
  private targetVy = 0;
  private currentVx = 0;
  private currentVy = 0;
  private currentSpeed = 0;
  private posX = 0.5;
  private posY = 0.5;
  private isActive = false;
  private hasMoved = false;

  public update(now: number, dampening = 0.88): PointerPhysicsState {
    this.currentVx = this.currentVx * dampening + this.targetVx * (1 - dampening);
    this.currentVy = this.currentVy * dampening + this.targetVy * (1 - dampening);
    this.targetVx *= dampening;
    this.targetVy *= dampening;

    const currentMag = Math.hypot(this.currentVx, this.currentVy);
    this.currentSpeed = this.currentSpeed * 0.85 + currentMag * 0.15;

    return {
      x: this.posX,
      y: this.posY,
      vx: this.currentVx,
      vy: this.currentVy,
      speed: Math.min(this.currentSpeed * 12, 1),
      active: this.isActive,
      rawX: this.lastX,
      rawY: this.lastY,
    };
  }

  public onPointerMove(clientX: number, clientY: number, bounds: DOMRect, now: number): void {
    const uvX = Math.max(0, Math.min(1, (clientX - bounds.left) / bounds.width));
    const uvY = Math.max(0, Math.min(1, (clientY - bounds.top) / bounds.height));

    if (!this.hasMoved) {
      this.lastX = uvX;
      this.lastY = uvY;
      this.lastTime = now;
      this.posX = uvX;
      this.posY = uvY;
      this.hasMoved = true;
      this.isActive = true;
      return;
    }

    const dt = Math.max(0.001, (now - this.lastTime) / 1000);
    const dx = uvX - this.lastX;
    const dy = uvY - this.lastY;

    this.targetVx = Math.max(-2, Math.min(2, dx / dt));
    this.targetVy = Math.max(-2, Math.min(2, dy / dt));

    this.posX = uvX;
    this.posY = uvY;
    this.lastX = uvX;
    this.lastY = uvY;
    this.lastTime = now;
    this.isActive = true;
  }

  public onPointerEnter(clientX: number, clientY: number, bounds: DOMRect): void {
    const uvX = Math.max(0, Math.min(1, (clientX - bounds.left) / bounds.width));
    const uvY = Math.max(0, Math.min(1, (clientY - bounds.top) / bounds.height));
    this.posX = uvX;
    this.posY = uvY;
    this.lastX = uvX;
    this.lastY = uvY;
    this.lastTime = performance.now();
    this.isActive = true;
  }

  public onPointerLeave(): void {
    this.isActive = false;
  }

  public reset(): void {
    this.targetVx = 0;
    this.targetVy = 0;
    this.currentVx = 0;
    this.currentVy = 0;
    this.currentSpeed = 0;
    this.isActive = false;
    this.hasMoved = false;
  }
}
