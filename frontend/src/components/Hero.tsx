import "./Hero.css";

function Hero() {
  return (
    <section id="intro" className="hero">
      <div className="hero__inner">
        <p className="hero__role">Software engineer</p>
        <h1 className="hero__name">Aaron Rodgers</h1>
        <p className="hero__focus">
          Software engineering, Cyber Security, and Network Engineering
        </p>
      </div>
    </section>
  );
}

export default Hero;
