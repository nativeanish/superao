import { Othent, AppInfo } from "@othent/kms";
import useAddress from "../../store/useAddress";

const appInfo: AppInfo = {
  name: "SuperAO",
  version: "1.0.0",
  env: "testing",
  logo: "https://arweave.net/7aE4UrBuIs2GZ2DGK-DMpPQYMk6JaO5je8MerFhfLNg",
};

export const othent =
  typeof window === "undefined"
    ? null
    : new Othent({ appInfo, throwErrors: false });

async function connectothent() {
  if (othent) {
    await othent.connect();
    await othent.requireAuth();
    const address = await othent.getActiveAddress();
    if (othent.isAuthenticated && address.length > 0) {
      useAddress.getState().setAuth("othent");
      useAddress.getState().setAddress(address);
    }
  }
}

export default function connect() {
  connectothent().catch(console.log);
}
