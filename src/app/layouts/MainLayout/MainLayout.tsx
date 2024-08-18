import { Outlet } from "react-router-dom";

import { Footer, Header } from "@/widgets";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export { MainLayout };
