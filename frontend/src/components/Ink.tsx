import { useEffect, useRef, type ElementType } from "react";
import { useBubbles } from "./bubbles-context";
import "./Ink.css";

type InkProps = {
  as?: ElementType;
  className?: string;
  children: string;
};

// Renders the text twice: the normal copy, plus an aria-hidden copy on top.
// The top copy is transparent except where a circle is behind it, where it
// shows white (see Ink.css). Outside a <BubbleBackground> it is just text.
function Ink({ as: Tag = "p", className = "", children }: InkProps) {
  const register = useBubbles();
  const overlayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = overlayRef.current;
    if (!register || !el) return;
    return register(el);
  }, [register]);

  return (
    <Tag className={`${className} ink`.trim()}>
      {children}
      <span className="ink__over" aria-hidden="true" ref={overlayRef}>
        {children}
      </span>
    </Tag>
  );
}

export default Ink;
