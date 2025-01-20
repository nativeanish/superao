import App from "../../components/App";
import ConnectButton from "../../components/ConnectButton";
import SideBar from "../../components/SideBar";

function Index() {
  return (
    <div className="min-h-screen bg-neutral-800">
      <SideBar />
      <ConnectButton />
      <App />
    </div>
  );
}

export default Index;
