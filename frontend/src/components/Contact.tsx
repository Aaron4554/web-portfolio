import Ink from "./Ink";
import { usePushTiles } from "../hooks/usePushTiles";
import "./Contact.css";

type Contact = { name: string; abbrev?: string };

const CONTACTS: Record<string, { name: string; link: string }> = {
  linkedIn: {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/44r0n-rodgers",
  },
  gitHub: {
    name: "GitHub",
    link: "https://github.com/Aaron4554",
  },
};

const label = ({ name }: Contact) => `${name} \u2197\uFE0E`;

function Contact() {
  const { gridProps, tileProps } = usePushTiles();

  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <Ink as="h2" className="contact__section">
          Contact
        </Ink>
        <ul className="tile__grid" {...gridProps}>
          {Object.entries(CONTACTS).map(([key, cert], i) => (
            <a
              key={key}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <li key={key} className="tile" {...tileProps(i)}>
                <Ink className="tile__text">{label(cert)}</Ink>
              </li>
            </a>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Contact;
