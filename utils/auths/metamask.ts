import { ethers } from "ethers";
import useAddress from "../../store/useAddress";
export async function connectMetaMask() {
  // Check if MetaMask is installed
  if (!window.ethereum) {
    alert("MetaMask is not installed. Please install it to use this feature.");
    return;
  }

  try {
    // Request account access
    if (
      window.ethereum &&
      window.ethereum.request &&
      window.ethereum.isMetaMask
    ) {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Create a new provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Get the signer
      const signer = provider.getSigner();

      // Get the user's address
      const address = await signer.getAddress();
      if (address && address.length) {
        useAddress.getState().setAuth("metamask");
        useAddress.getState().setAddress(address);
      }

      return { provider, signer, address };
    }
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
  }
}

export default function connect() {
  connectMetaMask().catch(console.log);
}
