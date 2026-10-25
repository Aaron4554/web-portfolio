import Ink from "./Ink";
import "./Interests.css";

// Replace these with your own. Each item needs a title and one plain-text
// sentence (Ink only accepts a single plain string).
const INTERESTS = [
  {
    title: "Software engineering",
    text: "Replace this with a sentence about it.",
  },
  {
    title: "Cyber security",
    text: "Replace this with a sentence about it.",
  },
  {
    title: "Network engineering",
    text: "Replace this with a sentence about it.",
  },
  {
    title: "Interest four",
    text: "Replace this with a sentence about it.",
  },
  {
    title: "Interest five",
    text: "Replace this with a sentence about it.",
  },
  {
    title: "Interest six",
    text: "Replace this with a sentence about it.",
  },
];

function Interests() {
  return (
    <section id="interests" className="interests">
      <div className="interests__inner">
        <Ink as="h2" className="interests__section">
          Interests
        </Ink>
        <ul className="interests__grid">
          {INTERESTS.map(({ title, text }) => (
            <li key={title} className="interest-card">
              <Ink as="h3" className="interest-card__title">
                {title}
              </Ink>
              <Ink className="interest-card__text">{text}</Ink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Interests;
