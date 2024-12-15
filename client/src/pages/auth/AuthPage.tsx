import { PropsWithChildren } from "react";

import Link from "@/components/utility/Link";
import CONTENT from "@/constants/content";

type AuthContent = (typeof CONTENT)["auth"];

type AuthPageProps = PropsWithChildren & {
  content: AuthContent[keyof AuthContent]["mainContent"];
};

function AuthPage({ children, content }: AuthPageProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 md:px-0">
      <div className="flex flex-col items-center py-4 w-full bg-dark max-w-none md:max-w-[600px] mb-3">
        <h3 className="text-xl font-bold mb-6 text-center">{content.title}</h3>
        {children}
        {content.links.map((link) => (
          <Link key={link.to} to={link.to} className="mb-2">
            {link.text}
          </Link>
        ))}
      </div>
      <Link to="#">بازگشت به صفحه اصلی</Link>
    </div>
  );
}

export default AuthPage;
