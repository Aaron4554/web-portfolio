import Ink from "./Ink";
import { usePushTiles } from "../hooks/usePushTiles";
import "./Certifications.css";

type Certification = { name: string; abbrev?: string };

const CERTIFICATIONS: Record<string, { name: string; abbrev?: string }> = {
  SEC: { name: "Security+" },
  CPE: { name: "C++ Entry-Level", abbrev: "CPE" },
  PCAP: { name: "Python Associate", abbrev: "PCAP" },
  PCEP: { name: "Python Entry-Level", abbrev: "PCEP" },
};

const label = ({ name, abbrev }: Certification) =>
  abbrev ? `${abbrev} \u00B7 ${name} \u2197\uFE0E` : `${name} \u2197\uFE0E`;

function Certifications() {
  const { gridProps, tileProps } = usePushTiles();

  return (
    <section id="certifications" className="certifications">
      <div className="certifications__inner">
        <Ink as="h2" className="certifications__section">
          Certifications
        </Ink>
        <ul className="certifications__grid" {...gridProps}>
          {Object.entries(CERTIFICATIONS).map(([key, cert], i) => (
            <li key={key} className="certification-tile" {...tileProps(i)}>
              <Ink className="certification-tile__text">{label(cert)}</Ink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Certifications;
