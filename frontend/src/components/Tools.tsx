import Ink from "./Ink";
import { usePushTiles } from "../hooks/usePushTiles.ts";
import "./Tools.css";

const TOOLS = [
  "Python",
  "Javascript",
  "React",
  "C#",
  "C++",
  "Java",
  "Git",
  "GitHub",
  "GitHub Actions",
  "Open-Code",
  "Ansible",
  "Docker",
  "Linux",
  "Nginx",
];

function Tools() {
  const { gridProps, tileProps } = usePushTiles();

  return (
    <section id="tools" className="tools">
      <div className="tools__inner">
        <Ink as="h2" className="tools__section">
          Tools
        </Ink>
        <ul className="tiles__grid" {...gridProps}>
          {TOOLS.map((item, i) => (
            <li key={item} className="tile" {...tileProps(i)}>
              <Ink className="tile__text">{item}</Ink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Tools;
