import useAddress from "../store/useAddress";
import { wallet } from "./auths/arweave";
import { othent } from "./auths/othent";

async function DisconnectApp() {
  try {
    const auth = useAddress.getState().auth;
    if (auth === "arconnect" || auth === "arweave") {
      if (auth === "arweave") {
        await wallet.namespaces.arweaveWallet.disconnect();
      } else {
        await window.arweaveWallet.disconnect();
      }
    }
    if (auth === "othent") {
      await othent?.disconnect();
    }
    useAddress.getState().setAddress(null);
    useAddress.getState().setAuth(null);
  } catch (err) {
    console.log(err);
    return err;
  }
}

export default function disconnect() {
  DisconnectApp().catch(console.log);
}
