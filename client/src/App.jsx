import "./App.css";
import RootRouters from "./router/RootRouter";
import { Toaster } from "@/components/ui/sonner";
function App() {
  return (
    <>
      <RootRouters />
      <Toaster richColors />
    </>
  );
}

export default App;
