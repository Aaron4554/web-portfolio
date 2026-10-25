import { useRef, type PointerEvent } from "react";
import Ink from "./Ink";
import "./Interests.css";

// Add or remove items freely; the grid adjusts.
const INTERESTS = ["Containers", "Open-source", "AI/ML", "Quantum Computing"];

// Tuning for the "nearby tiles get pushed away" effect.
const PUSH_PX = 18; // how far the closest neighbors move
const REACH = 2.2; // how far the push reaches, in tile widths

function Interests() {
  const tilesRef = useRef<(HTMLLIElement | null)[]>([]);

  // Push every other tile directly away from the hovered one. The strength
  // fades with distance, and CSS transitions make the movement smooth.
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
    <section id="interests" className="interests">
      <div className="interests__inner">
        <Ink as="h2" className="interests__section">
          Interests
        </Ink>
        <ul className="interests__grid" onPointerLeave={reset}>
          {INTERESTS.map((item, i) => (
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

export default Interests;
