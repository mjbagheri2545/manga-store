import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

import { ArrowUpIcon } from "lucide-react";

import { Button } from "@/components/utility";

import { ProductGroupsProvider } from "../productGroup";
import Footer from "./footer";
import Header from "./header";

export function MainLayout({ children }: PropsWithChildren) {
  // mt-[120px] -> 80px for header because header has position fixed plus
  // 40px same as mb-10 (mb-10 = mb-[40px])

  function handleOnScrollToTop() {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }

  return (
    <ProductGroupsProvider>
      <Header />
      <main className="flex flex-col flex-1 w-full min-h-fit items-center justify-center gap-5 mt-[120px] mb-10 px-5 mx-auto max-w-[1400px] min-[1440px]:px-0">
        {children ?? <Outlet />}
      </main>
      <Footer />
      <Button
        variant="icon"
        className="fixed z-50 right-8 bottom-8 bg-primary hover:bg-primary-500 hover:-translate-y-1"
        onClick={handleOnScrollToTop}
      >
        <ArrowUpIcon />
      </Button>
    </ProductGroupsProvider>
  );
}
