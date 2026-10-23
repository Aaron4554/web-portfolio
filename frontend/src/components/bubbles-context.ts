import { createContext, useContext } from "react";

// Called by each <Ink> with its overlay element. Returns an unregister function.
export type RegisterInk = (el: HTMLElement) => () => void;

export const BubbleContext = createContext<RegisterInk | null>(null);

export const useBubbles = () => useContext(BubbleContext);
