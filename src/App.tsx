import { Button } from "@heroui/react";
import SideBar from "../components/SideBar";
import { ChevronDown, Wallet } from "lucide-react";
function App() {
  return (
    <div className="min-h-screen bg-neutral-800">
      <SideBar />
      <Button
        startContent={<Wallet />}
        endContent={<ChevronDown />}
        className="fixed top-4 right-4 z-50 bg-white"
        size="md"
        radius="sm"
      >
        Connect
      </Button>
    </div>
  );
}

export default App;
