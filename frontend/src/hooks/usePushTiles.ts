import { useRef, type PointerEvent } from "react";

type Options = {
  /** How far the closest neighbors move, in pixels. */
  pushPx?: number;
  /** How far the push reaches, in tile widths. */
  reach?: number;
};

/**
 * Makes the tiles in a grid move away from whichever one the pointer is on.
 *
 * Usage:
 *   const { gridProps, tileProps } = usePushTiles();
 *   <ul {...gridProps}>
 *     {items.map((item, i) => (
 *       <li key={item} {...tileProps(i)}>...</li>
 *     ))}
 *   </ul>
 *
 * The hook writes --dx and --dy onto each tile. The tile's CSS decides how
 * to use them (transform: translate(var(--dx, 0px), var(--dy, 0px))).
 */
export function usePushTiles<T extends HTMLElement = HTMLLIElement>({
  pushPx = 18,
  reach = 2.2,
}: Options = {}) {
  const tilesRef = useRef<(T | null)[]>([]);

  // Push every other tile directly away from the active one. The strength
  // fades with distance; CSS transitions make the movement smooth.
  const pushAwayFrom = (active: number) => {
    const tiles = tilesRef.current;
    const a = tiles[active];
    if (!a) return;
    const ax = a.offsetLeft + a.offsetWidth / 2;
    const ay = a.offsetTop + a.offsetHeight / 2;
    const reachPx = a.offsetWidth * reach;

    tiles.forEach((el, i) => {
      if (!el) return;
      let dx = 0;
      let dy = 0;
      if (i !== active) {
        const vx = el.offsetLeft + el.offsetWidth / 2 - ax;
        const vy = el.offsetTop + el.offsetHeight / 2 - ay;
        const dist = Math.hypot(vx, vy) || 1;
        const amount = Math.max(0, 1 - dist / reachPx) * pushPx;
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

  const onEnter = (e: PointerEvent<T>, i: number) => {
    if (e.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    pushAwayFrom(i);
  };

  return {
    /** Spread onto the grid container (the <ul>). */
    gridProps: { onPointerLeave: reset },
    /** Spread onto each tile: <li {...tileProps(i)}>. */
    tileProps: (i: number) => ({
      ref: (el: T | null) => {
        tilesRef.current[i] = el;
      },
      onPointerEnter: (e: PointerEvent<T>) => onEnter(e, i),
    }),
  };
}
