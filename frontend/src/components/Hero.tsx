import Ink from "./Ink";
import "./Hero.css";

function Hero() {
  return (
    <section id="intro" className="hero">
      <div className="hero__inner">
        <Ink className="hero__role">Software engineer</Ink>
        <Ink as="h1" className="hero__name">
          Aaron Rodgers
        </Ink>
        <Ink className="hero__focus">
          Software engineering, Cyber Security, and Network Engineering
        </Ink>
      </div>
    </section>
  );
}

export default Hero;
