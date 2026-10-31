import Ink from "./Ink";
import { usePushTiles } from "../hooks/usePushTiles.ts";
import "./Interests.css";

const INTERESTS = [
  "Containers",
  "Open-source",
  "Self hosting",
  "AI/ML",
  "Quantum Computing",
];

function Interests() {
  const { gridProps, tileProps } = usePushTiles();

  return (
    <section id="interests" className="interests">
      <div className="interests__inner">
        <Ink as="h2" className="interests__section">
          Interests
        </Ink>
        <ul className="tile__grid" {...gridProps}>
          {INTERESTS.map((item, i) => (
            <li key={item} className="tile" {...tileProps(i)}>
              <Ink className="tile__text">{item}</Ink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Interests;
