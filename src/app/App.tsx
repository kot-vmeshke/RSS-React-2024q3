import { StoreProvider } from "@/app/providers";
import { AppRouter } from "@/app/routers";

import "@/app/styles/App.scss";

function App() {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  );
}

export { App };
