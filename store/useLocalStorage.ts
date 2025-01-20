import { create } from "zustand";

interface State<T> {
  setState: (key: string, value: T) => void;
  getState: (key: string) => T | null;
  clear: () => void;
}

export const useLocalStore = create<State<any>>((set) => ({
  setState: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      set(() => ({})); // Trigger a re-render if necessary
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  },

  getState: (key) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Error retrieving from localStorage", error);
      return null;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      set(() => ({})); // Clear the state and trigger a re-render if necessary
    } catch (error) {
      console.error("Error clearing localStorage", error);
    }
  },
}));

export default useLocalStore;
