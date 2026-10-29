import Ink from "./Ink";
import { usePushTiles } from "../hooks/usePushTiles";
import "./Certifications.css";

type Certification = { name: string; abbrev?: string };

const CERTIFICATIONS: Record<
  string,
  { name: string; abbrev?: string; link: string }
> = {
  SEC: {
    name: "Security+",
    link: "https://cp.certmetrics.com/comptia/en/public/verify/credential/7VHMYW15KJ11Q0W3",
  },
  CPE: {
    name: "C++ Entry-Level",
    abbrev: "CPE",
    link: "https://verify.openedg.org/?id=zcat.t3rg.fHvv",
  },
  PCAP: {
    name: "Python Associate",
    abbrev: "PCAP",
    link: "https://verify.openedg.org/?id=yYLN.F2vP.jt8V",
  },
  PCEP: {
    name: "Python Entry-Level",
    abbrev: "PCEP",
    link: "https://verify.openedg.org/?id=ZGdn.2dwb.k8kd",
  },
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
            <a
              key={key}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{textDecoration: "none"}}
            >
              <li key={key} className="certification-tile" {...tileProps(i)}>
                <Ink className="certification-tile__text">{label(cert)}</Ink>
              </li>
            </a>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Certifications;
