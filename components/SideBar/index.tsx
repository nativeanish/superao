import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Menu, Search, X } from "lucide-react";
import SuperAO from "../../Image/SuperAO";
import { Button, Tooltip } from "@heroui/react";

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleSearchClick = () => {
    setIsSearching(true);
    setIsCollapsed(false);
  };

  const handleSearchClose = () => {
    setIsSearching(false);
    setSearchQuery("");
  };

  useEffect(() => {
    if (isActive) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [isActive]);
  return (
    <>
      {/* Mobile toggle button */}
      <Tooltip
        content={isCollapsed ? "Expand" : "Collapse"}
        placement={"right-end"}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`md:hidden fixed top-4 left-4 z-50 p-2 bg-zinc-900 text-zinc-400 hover:text-zinc-100 rounded-md transition-all duration-300 ease-in-out ${
            isCollapsed ? "left-4" : "left-72"
          }`}
        >
          {isCollapsed ? (
            <Menu className="w-6 h-6" />
          ) : (
            <ChevronLeft className="w-6 h-6" />
          )}
        </button>
      </Tooltip>

      <aside
        className={`fixed top-0 left-0 z-40 h-screen bg-zinc-900 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-0 md:w-20 overflow-hidden" : "w-64"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header with SuperAO logo */}
          <div className="flex items-center justify-between h-20 px-4 border-b border-zinc-800">
            <div
              className={`flex items-center ${
                isCollapsed ? "justify-center w-full" : ""
              }`}
            >
              <SuperAO className={`h-14 w-14 ${isCollapsed ? "" : "mr-3"}`} />
              {!isCollapsed && (
                <span className="text-zinc-200 font-semibold text-xl">
                  SuperAO
                </span>
              )}
            </div>
          </div>
          {/* New Chat button */}
          <div className="px-4 py-4">
            <Tooltip
              content="Start a Chat"
              placement={isCollapsed ? "right-end" : "top"}
            >
              <Button
                className="w-full justify-start"
                variant="solid"
                startContent={<Plus className="mr-2 h-4 w-4" />}
              >
                {!isCollapsed ? <>New Chat</> : null}
              </Button>
            </Tooltip>
          </div>

          <div className="px-4 py-4">
            {isSearching && !isCollapsed ? (
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-3 py-2 bg-zinc-800 text-zinc-100 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                  autoFocus
                  onFocus={() => setIsActive(true)}
                  onBlur={() => setIsActive(false)}
                />
                <button
                  onClick={handleSearchClose}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Tooltip
                content="Search in History"
                placement={isCollapsed ? "right-end" : "top"}
              >
                <Button
                  className="w-full justify-start hover:cursor-text"
                  variant="solid"
                  startContent={<Search className="mr-2 h-4 w-4" />}
                  onPress={handleSearchClick}
                >
                  {!isCollapsed ? (
                    <>
                      {searchQuery.length ? <>{searchQuery}</> : "Search ..."}
                    </>
                  ) : null}
                </Button>
              </Tooltip>
            )}
          </div>

          {/* Chat history could be added here */}
          <nav className="flex-1 px-2 py-4">
            {/* Chat history items would go here */}
          </nav>

          {/* Footer with collapse button */}
          <div className="border-t border-zinc-800 p-4">
            <Tooltip
              content={isCollapsed ? "Expand" : "Collapse"}
              placement={isCollapsed ? "right-end" : "top"}
            >
              <Button
                onPress={() => setIsCollapsed(!isCollapsed)}
                className={`md:flex items-center justify-center w-full p-2 text-black ${
                  !isCollapsed
                    ? "hover:cursor-w-resize"
                    : "hover:cursor-e-resize"
                }`}
              >
                {isCollapsed ? (
                  <ChevronRight className="w-6 h-6" />
                ) : (
                  <>
                    <ChevronLeft className="w-6 h-6" />
                    <span className="ml-2">Collapse</span>
                  </>
                )}
              </Button>
            </Tooltip>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
