import Ink from "./Ink";
import { usePushTiles } from "../hooks/usePushTiles";
import "./Certifications.css";

const CERTIFICATIONS = [
  "Security+",
  "CPE C++ Entry-Level",
  "PCAP Python Associate",
  "PCEP Python Entry-Level",
];

function Certifications() {
  const { gridProps, tileProps } = usePushTiles();

  return (
    <section id="certifications" className="certifications">
      <div className="certifications__inner">
        <Ink as="h2" className="certifications__section">
          Certifications
        </Ink>
        <ul className="certifications__grid" {...gridProps}>
          {CERTIFICATIONS.map((item, i) => (
            <li key={item} className="certification-tile" {...tileProps(i)}>
              <Ink className="certification-tile__text">{item}</Ink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Certifications;
