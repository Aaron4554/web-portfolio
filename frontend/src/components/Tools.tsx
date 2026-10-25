import { useRef, type PointerEvent } from "react";
import Ink from "./Ink";
import "./Tools.css";

const TOOLS = [
  "Python",
  "Javascript",
  "React",
  "C#",
  "C++",
  "Java",
  "Docker",
  "Git",
  "GitHub",
  "GitHub Actions",
  "Ansible",
  "Open-Code",
  "Linux",
  "Nginx",
];

const PUSH_PX = 18; // how far the closest neighbors move
const REACH = 2.2; // how far the push reaches, in tile widths

function Tools() {
  const tilesRef = useRef<(HTMLLIElement | null)[]>([]);

  const pushAwayFrom = (active: number) => {
    const tiles = tilesRef.current;
    const a = tiles[active];
    if (!a) return;
    const ax = a.offsetLeft + a.offsetWidth / 2;
    const ay = a.offsetTop + a.offsetHeight / 2;
    const reach = a.offsetWidth * REACH;

    tiles.forEach((el, i) => {
      if (!el) return;
      let dx = 0;
      let dy = 0;
      if (i !== active) {
        const vx = el.offsetLeft + el.offsetWidth / 2 - ax;
        const vy = el.offsetTop + el.offsetHeight / 2 - ay;
        const dist = Math.hypot(vx, vy) || 1;
        const amount = Math.max(0, 1 - dist / reach) * PUSH_PX;
        dx = (vx / dist) * amount;
        dy = (vy / dist) * amount;
      }
      el.style.setProperty("--dx", `${dx.toFixed(1)}px`);
      el.style.setProperty("--dy", `${dy.toFixed(1)}px`);
    });
  };

  const reset = () => {
    tilesRef.current.forEach((el) => {
      el?.style.setProperty("--dx", "0px");
      el?.style.setProperty("--dy", "0px");
    });
  };

  const onEnter = (e: PointerEvent<HTMLLIElement>, i: number) => {
    if (e.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    pushAwayFrom(i);
  };

  return (
    <section id="tools" className="tools">
      <div className="tools__inner">
        <Ink as="h2" className="tools__section">
          Tools
        </Ink>
        <ul className="tools__grid" onPointerLeave={reset}>
          {TOOLS.map((item, i) => (
            <li
              key={item}
              className="interest-tile"
              ref={(el) => {
                tilesRef.current[i] = el;
              }}
              onPointerEnter={(e) => onEnter(e, i)}
            >
              <Ink className="interest-tile__text">{item}</Ink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Tools;
