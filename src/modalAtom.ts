import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import deepEqual from "fast-deep-equal";

export const modalAtom = atom(false);
export const modalIndexAtom = atom(0);
export const modalHistoryAtom = atom([0]);

export type ModalType = {
  id: string;
  open?: boolean;
  index?: number;
  history?: number[];
};

export const todoAtomFamily = atomFamily(
  (modal: ModalType) => atom({ open: false, index: 0, history: [0] }),
  (a, b) => a.id === b.id
);

export const idsAtom = atom<string[]>([]);
