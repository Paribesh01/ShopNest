"use client";
import { atom } from "recoil";

// Utility function to sync with localStorage
const localStorageEffect = (key: string) => ({ setSelf, onSet }: { setSelf: (value: any) => void; onSet: (callback: (newValue: any, _: any, isReset: boolean) => void) => void }) => {
  if (typeof window !== 'undefined') {
    const savedValue = localStorage.getItem(key);

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  }
};

// Define your atoms with appropriate types
export const cartState = atom<boolean>({
  key: "cartState",
  default: false,
});


export const cartItemState = atom<any[]>({
  key: "cartItemState",
  default: [],
  effects_UNSTABLE: [localStorageEffect("cartItemState")], // Use localStorageEffect
});
