import useAddress from "../../store/useAddress";

export const async_connect = async () => {
  try {
    await window.arweaveWallet.connect(
      [
        "ACCESS_ADDRESS",
        "ACCESS_ALL_ADDRESSES",
        "ACCESS_ARWEAVE_CONFIG",
        "ACCESS_PUBLIC_KEY",
        "DECRYPT",
        "ENCRYPT",
        "DISPATCH",
        "SIGNATURE",
        "SIGN_TRANSACTION",
      ],
      {
        name: "SuperAO",
        logo: "https://arweave.net/7aE4UrBuIs2GZ2DGK-DMpPQYMk6JaO5je8MerFhfLNg",
      }
    );
    checkConnection();
  } catch (err) {
    alert(err);
  }
};
export default function connect() {
  async_connect().catch(console.log);
}

export const checkConnection = async () => {
  try {
    const data = await window.arweaveWallet.getActiveAddress();
    if (data && data.length) {
      useAddress.getState().setAddress(data);
      useAddress.getState().setAuth("arconnect");
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};
