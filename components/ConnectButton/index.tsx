import { ChevronDown, LayoutDashboard, Unplug, Wallet } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { useState } from "react";
import ArConnect from "../../Image/ArConnect";
import Metamask from "../../Image/MetaMask";
import Arweave from "../../Image/Arweave";
import Othent from "../../Image/Othent";
import useAddress, { auth } from "../../store/useAddress";
import * as arconnect from "../../utils/auths/arconnect";
import * as metamaskconnct from "../../utils/auths/metamask";
import * as arweaveConnect from "../../utils/auths/arweave";
import * as otherconnect from "../../utils/auths/othent";
import { Selection } from "@heroui/react";
const key: Array<{ key: auth; label: string }> = [
  { key: "metamask", label: "MetaMask" },
  { key: "arconnect", label: "ArConnect" },
  { key: "arweave", label: "Arweave.app" },
  { key: "othent", label: "Othent" },
];
function ConnectButton() {
  const [isOpen, setOpen] = useState(false);
  const address = useAddress((state) => state.address);
  const auth = useAddress((state) => state.auth);

  const connect = (keys: Selection) => {
    const selectedKey = Array.from(keys)[0];
    if (selectedKey === "metamask") {
      metamaskconnct.default();
    }
    if (selectedKey === "arconnect") {
      arconnect.default();
    }
    if (selectedKey === "arweave") {
      arweaveConnect.default();
    }
    if (selectedKey === "othent") {
      otherconnect.default();
    }
  };
  return (
    <div>
      <Dropdown
        onOpenChange={() => setOpen(true)}
        onClose={() => setOpen(false)}
        backdrop="blur"
      >
        <DropdownTrigger>
          <Button
            startContent={
              address?.length && auth?.length ? (
                <div>
                  <div>{auth === "arconnect" && <ArConnect />}</div>
                  <div>{auth === "arweave" && <Arweave />}</div>
                  <div>{auth === "metamask" && <Metamask />}</div>
                  <div>{auth === "othent" && <Othent />}</div>
                </div>
              ) : (
                <Wallet />
              )
            }
            endContent={
              <ChevronDown className={`${isOpen ? "rotate-180" : ""}`} />
            }
            className="fixed top-4 right-4 z-50 bg-white"
            size="md"
            radius="sm"
          >
            {address?.length && auth?.length ? (
              <div>
                {address.length > 8 ? `${address.slice(0, 8)}...` : address}
              </div>
            ) : (
              <div>Connect</div>
            )}
          </Button>
        </DropdownTrigger>
        {address?.length && auth?.length ? (
          <DropdownMenu
            aria-label="Actions"
            selectionMode="single"
            onSelectionChange={connect}
            items={key}
          >
            <DropdownItem key="metamask" startContent={<LayoutDashboard />}>
              Dashboard
            </DropdownItem>
            <DropdownItem
              key="arconnect"
              startContent={<Unplug />}
              color="danger"
            >
              Disconnect
            </DropdownItem>
          </DropdownMenu>
        ) : (
          <DropdownMenu
            aria-label="Actions"
            selectionMode="single"
            onSelectionChange={connect}
            items={key}
          >
            <DropdownItem key="metamask" startContent={<Metamask />}>
              MetaMask
            </DropdownItem>
            <DropdownItem key="arconnect" startContent={<ArConnect />}>
              ArConnect
            </DropdownItem>
            <DropdownItem key="arweave" startContent={<Arweave />}>
              Arweave.app
            </DropdownItem>
            <DropdownItem key="othent" startContent={<Othent />}>
              Othent
            </DropdownItem>
          </DropdownMenu>
        )}
      </Dropdown>
    </div>
  );
}

export default ConnectButton;
