import { create } from "zustand";
export type auth = "arconnect" | "metamask" | "othent" | "arweave";
interface State {
  address: string | null;
  auth: auth | null;
  setAddress: (e: string | null) => void;
  setAuth: (e: auth | null) => void;
}
const useAddress = create<State>((set) => ({
  address: null,
  auth: null,
  setAddress(e) {
    set({ address: e });
  },
  setAuth(e) {
    set({ auth: e });
  },
}));
export default useAddress;
