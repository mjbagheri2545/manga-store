import { PropsWithChildren } from "react";

import Link from "@/components/utility/Link";
import PATH from "@/constants/path";

function Auth_UserFormLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 md:px-0 py-5">
      <div className="flex flex-col items-center py-4 w-full bg-dark max-w-none md:max-w-[600px] mb-3">
        {children}
      </div>
      <Link to={PATH.home.landingPage}>بازگشت به صفحه اصلی</Link>
    </div>
  );
}

export default Auth_UserFormLayout;
