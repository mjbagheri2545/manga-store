import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

import { ProductGroupsProvider } from "../productGroup";
import Footer from "./footer";
import Header from "./header";

export function MainLayout({ children }: PropsWithChildren) {
  // mt-[120px] -> 80px for header because header has position fixed plus
  // 40px same as mb-10 (mb-10 = mb-[40px])
  return (
    <ProductGroupsProvider>
      <Header />
      <main className="flex flex-col flex-1 w-full items-center justify-center gap-5 mt-[120px] mb-10 px-5 mx-auto max-w-[1400px] min-[1440px]:px-0">
        {children ?? <Outlet />}
      </main>
      <Footer />
    </ProductGroupsProvider>
  );
}
