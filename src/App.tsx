import { useNavigate, useHref, Routes, Route } from "react-router-dom";
import Index from "../page/Index/Index";
import { HeroUIProvider } from "@heroui/react";
import Dashboard from "../page/Dashboard";
import NotFound from "../page/NotFound";

function App() {
  const navigate = useNavigate();
  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HeroUIProvider>
  );
}

export default App;
