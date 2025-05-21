import { atom } from "jotai";

/**
 * A simple counter atom.
 */
export const countAtom = atom(0);

/**
 * A derived atom that doubles the count.
 */
export const doubledCountAtom = atom((get) => get(countAtom) * 2);
