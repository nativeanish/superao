import { create } from "zustand";
import useLocalStore from "./useLocalStorage";
export type Auth = "arconnect" | "metamask" | "othent" | "arweave";
interface State {
  address: string | null;
  auth: Auth | null;
  setAddress: (e: string | null) => void;
  setAuth: (e: Auth | null) => void;
}
const useAddress = create<State>((set) => ({
  address: null,
  auth: null,
  setAddress(e) {
    set({ address: e });
    useLocalStore.getState().setState("address", e);
  },
  setAuth(e) {
    set({ auth: e });
    useLocalStore.getState().setState("auth", e);
  },
}));
export default useAddress;
