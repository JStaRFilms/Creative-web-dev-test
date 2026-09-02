import { Header } from "@/components/Header";
import {
  Annotation,
  ArtifactFrame,
  DensityWedge,
  DimensionLine,
  GuideLine,
  HandArrow,
  PaperNote,
  ProofCorners,
  RegistrationMark,
  RevisionStamp,
  SystemLabel,
} from "@/components/proof/ProofMarks";

const projects = [
  ["01", "MELO", "BUILDER / SYSTEMS"],
  ["02", "THE ₦0 UNIVERSITY AD", "DIRECTOR / FILM"],
  ["03", "TAKOMI", "ENGINEER / AI"],
  ["04", "MODEL OBSERVATORY", "EXPERIMENTER"],
  ["05", "CFOP ROADMAP", "TEACHER / INTERACTION"],
] as const;

function ColorControl() {
  return (
    <div className="color-control" aria-hidden="true">
      {(["K", "C", "M", "Y"] as const).map((color) => (
        <span key={color}><i className={`swatch swatch--${color.toLowerCase()}`} />{color}</span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main id="top">
      {process.env.NODE_ENV === "development" && (
        <label className="proof-debug-toggle">
          <input id="proof-debug" type="checkbox" />
          <span>GRID / DEBUG</span>
        </label>
      )}
      <section className="proof-page hero" aria-labelledby="hero-title">
        <ProofCorners />
        <Header />
        <GuideLine className="hero-baseline" />
        <GuideLine vertical className="hero-guide-one" />
        <GuideLine vertical className="hero-guide-two" />
        <DimensionLine label="CAP / 428 PT" className="hero-cap-measure" />
        <DimensionLine label="BASELINE / 00" className="hero-base-measure" />
        <SystemLabel className="side-code">MARGIN / 1680 × 960 — PROOF 01<br />SRGB IEC61966-2.1</SystemLabel>
        <Annotation className="hero-note-left">kerning<br />optical<br />+10</Annotation>
        <HandArrow className="hero-arrow-left" />
        <div className="hero-word-wrap">
          <span className="hero-registration" aria-hidden="true"><span>JO</span><span>HN</span></span>
          <span className="hero-ink-impression" aria-hidden="true"><span>JO</span><span>HN</span></span>
          <h1 id="hero-title"><span>JO</span><span>HN</span></h1>
          <span className="letter-index letter-index--j" aria-hidden="true">A/01</span>
          <span className="letter-index letter-index--n" aria-hidden="true">D/04</span>
        </div>
        <Annotation className="hero-note-right">ink<br />density<br />+5%</Annotation>
        <HandArrow className="hero-arrow-right" />
        <DensityWedge className="hero-density" />
        <SystemLabel className="hero-density-label">INK / 095<br />PAPER / WARM 01</SystemLabel>
        <div className="hero-copy">
          <p>I make things <u>across</u> software, film, AI, design and sound.</p>
          <SystemLabel>CURRENT MODE / <span className="proof-underline">EVERYTHING</span></SystemLabel>
        </div>
        <a className="scroll-prompt" href="#work">SCROLL TO ENTER ↓</a>
        <ColorControl />
        <SystemLabel className="version">VER. 0.1<br />05 / 20 / 26</SystemLabel>
        <RevisionStamp revision="rev A">PROOF 01</RevisionStamp>
        <RegistrationMark className="hero-registration-bottom" />
        <SystemLabel className="hero-folio">SHEET 01 / 03&nbsp;&nbsp; OUTPUT / STATIC PROOF</SystemLabel>
      </section>

      <section id="work" className="proof-page selected-work" aria-labelledby="work-title">
        <ProofCorners />
        <SystemLabel className="section-index">02 / SELECTED WORK</SystemLabel>
        <div className="work-intro">
          <SystemLabel>SELECTED WORK</SystemLabel>
          <div className="work-john-echo" aria-hidden="true">JOHN</div>
          <h2 id="work-title">FIVE THINGS<br />THAT EXPLAIN ME<br />BETTER THAN A BIO.</h2>
          <div className="system-update"><b>SYSTEM UPDATE</b><span>IDENTITY RESOLVED → LOADING WORK INDEX</span></div>
          <Annotation>contents of<br />the working proof</Annotation>
        </div>
        <div className="work-list-wrap">
          <div className="work-list-head">
            <SystemLabel>PROJECT INDEX</SystemLabel>
            <span>01—05</span>
          </div>
          <ol className="work-list">
            {projects.map(([number, name, mode]) => (
              <li key={number}>
                <span className="work-number">{number}<small>/05</small></span>
                <a href={number === "01" ? "#melo" : "#work"}>{name}</a>
                <span className="work-mode"><i>MODE</i>{mode}</span>
              </li>
            ))}
          </ol>
        </div>
        <Annotation className="work-note">keep it typographic<br />evidence comes later</Annotation>
        <HandArrow className="work-arrow" />
        <DensityWedge className="work-density" />
        <SystemLabel className="work-folio">SHEET 02 / 03&nbsp;&nbsp; INDEX / 01—05</SystemLabel>
        <RevisionStamp revision="keep">PROOF 01</RevisionStamp>
      </section>

      <section id="melo" className="proof-page melo" aria-labelledby="melo-title">
        <ProofCorners />
        <Header />
        <SystemLabel className="melo-side">PROJECT / 01<br />MODE / BUILDER<br />STATUS / IN PROGRESS</SystemLabel>
        <div className="melo-copy">
          <SystemLabel><span className="red">PROJECT</span> / 01</SystemLabel>
          <h2 id="melo-title">MELO</h2>
          <p className="melo-kicker">A school operating system built around the people actually using it.</p>
          <p className="melo-statement">ONE SCHOOL.<br />MANY SURFACES.<br />ONE SYSTEM.</p>
        </div>
        <div className="melo-system" aria-label="Melo system organization and required artifact inventory">
          <div className="builder-scatter" aria-label="Scattered school surfaces">
            <SystemLabel>INPUT / SCATTERED SURFACES</SystemLabel>
            {['TEACHER', 'ADMIN', 'PARENT', 'STUDENT', 'BILLING', 'CURRICULUM', 'PUBLIC SITE', 'AI'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="organize-rule" aria-hidden="true"><span>ORGANIZE</span></div>
          <ArtifactFrame label="ARTIFACT REGISTER / AUTHENTIC CAPTURES REQUIRED" className="melo-artifact">
            <div className="artifact-register-head">
              <span>MELO / SYSTEM 01</span><span>STATUS / ASSETS PENDING</span>
            </div>
            <div className="artifact-register-grid">
              {['ADMIN DASHBOARD', 'TEACHER INTERFACE', 'SCORE ENTRY', 'REPORT CARD', 'BILLING / INVOICE', 'CURRICULUM INTELLIGENCE'].map((item, index) => (
                <div className={`artifact-slot artifact-slot--${index + 1}`} key={item}>
                  <span className="slot-index">0{index + 1}</span>
                  <span className="slot-cross" aria-hidden="true" />
                  <b>{item}</b>
                  <small>REAL ARTIFACT REQUIRED</small>
                </div>
              ))}
            </div>
          </ArtifactFrame>
          <div className="system-map" aria-label="Organized Melo system relationships">
            <SystemLabel>OUTPUT / ONE SCHOOL SYSTEM</SystemLabel>
            <div className="system-map-core">MELO</div>
            {['TEACHER', 'ADMIN', 'PARENT', 'STUDENT', 'BILLING', 'CURRICULUM', 'PUBLIC SITE', 'AI'].map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
        <PaperNote className="melo-note">
          <SystemLabel>BUILD NOTE</SystemLabel>
          <p>Complexity → organization</p>
          <p className="small">Replace this frame with an authentic product capture.</p>
        </PaperNote>
        <Annotation className="melo-annotation">one system<br />many relationships</Annotation>
        <HandArrow className="melo-arrow" direction="down" />
        <ColorControl />
        <SystemLabel className="melo-folio">SHEET 03 / 03&nbsp;&nbsp; BUILDER / SYSTEMS</SystemLabel>
        <RevisionStamp revision="rev A">SYSTEM 01</RevisionStamp>
      </section>

      <div id="lab" className="future-anchor" aria-hidden="true" />
      <div id="about" className="future-anchor" aria-hidden="true" />
      <div id="contact" className="future-anchor" aria-hidden="true" />
    </main>
  );
}
