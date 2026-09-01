import { Header } from "@/components/Header";
import {
  Annotation,
  ArtifactFrame,
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
      <section className="proof-page hero" aria-labelledby="hero-title">
        <ProofCorners />
        <Header />
        <GuideLine className="hero-baseline" />
        <GuideLine vertical className="hero-guide-one" />
        <GuideLine vertical className="hero-guide-two" />
        <SystemLabel className="side-code">MARGIN / 1680 × 960 — PROOF 01</SystemLabel>
        <Annotation className="hero-note-left">kerning<br />optical<br />+10</Annotation>
        <HandArrow className="hero-arrow-left" />
        <div className="hero-word-wrap">
          <span className="hero-registration" aria-hidden="true"><span>JO</span><span>HN</span></span>
          <h1 id="hero-title"><span>JO</span><span>HN</span></h1>
        </div>
        <Annotation className="hero-note-right">ink<br />density<br />+5%</Annotation>
        <HandArrow className="hero-arrow-right" />
        <div className="hero-copy">
          <p>I make things <u>across</u> software, film, AI, design and sound.</p>
          <SystemLabel>CURRENT MODE / <span className="proof-underline">EVERYTHING</span></SystemLabel>
        </div>
        <a className="scroll-prompt" href="#work">SCROLL TO ENTER ↓</a>
        <ColorControl />
        <SystemLabel className="version">VER. 0.1<br />05 / 20 / 26</SystemLabel>
        <RevisionStamp revision="rev A">PROOF 01</RevisionStamp>
        <RegistrationMark className="hero-registration-bottom" />
      </section>

      <section id="work" className="proof-page selected-work" aria-labelledby="work-title">
        <ProofCorners />
        <SystemLabel className="section-index">02 / SELECTED WORK</SystemLabel>
        <div className="work-intro">
          <SystemLabel>SELECTED WORK</SystemLabel>
          <h2 id="work-title">FIVE THINGS<br />THAT EXPLAIN ME<br />BETTER THAN A BIO.</h2>
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
                <span className="work-number">{number}</span>
                <a href={number === "01" ? "#melo" : "#work"}>{name}</a>
                <span className="work-mode">→ {mode}</span>
              </li>
            ))}
          </ol>
        </div>
        <Annotation className="work-note">keep it typographic<br />evidence comes later</Annotation>
        <HandArrow className="work-arrow" />
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
        <div className="melo-system" aria-label="Melo product artifact placeholder">
          <ArtifactFrame label="ARTIFACT / REAL MELO UI REQUIRED" className="melo-artifact">
            <div className="placeholder-toolbar"><span>MELO</span><span>PRODUCT EVIDENCE / PENDING</span></div>
            <div className="placeholder-body">
              <div className="placeholder-nav" aria-hidden="true">
                <span /><span /><span /><span /><span />
              </div>
              <div className="placeholder-canvas">
                <SystemLabel>NEUTRAL ARTIFACT PLACEHOLDER</SystemLabel>
                <p>Real Melo interface assets were not included in the handoff package.</p>
                <div className="placeholder-grid" aria-hidden="true"><span /><span /><span /><span /></div>
              </div>
            </div>
          </ArtifactFrame>
          <div className="system-map" aria-label="Melo system relationships">
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
        <RevisionStamp revision="rev A">SYSTEM 01</RevisionStamp>
      </section>

      <div id="lab" className="future-anchor" aria-hidden="true" />
      <div id="about" className="future-anchor" aria-hidden="true" />
      <div id="contact" className="future-anchor" aria-hidden="true" />
    </main>
  );
}
