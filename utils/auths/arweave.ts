import { ArweaveWebWallet } from "arweave-wallet-connector";
import useAddress from "../../store/useAddress";

export const wallet = new ArweaveWebWallet({
  // optionally provide information about your app that will be displayed in the wallet provider interface
  name: "SuperAO",
  logo: "https://arweave.net/7aE4UrBuIs2GZ2DGK-DMpPQYMk6JaO5je8MerFhfLNg",
});

wallet.setUrl("arweave.app");
export default function connect() {
  connectArweave().catch(console.log);
}
async function connectArweave() {
  await wallet.connect();
  if (wallet.address?.length) {
    useAddress.getState().setAddress(wallet.address);
    useAddress.getState().setAuth("arweave");
  }
}
