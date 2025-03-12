import { PropsWithChildren } from "react";

type FooterSectionProps = PropsWithChildren & {
  title: string;
};

function FooterSection({ children, title }: FooterSectionProps) {
  return (
    <section className="w-full sm:w-1/2 lg:w-1/4 px-2.5">
      <span className="font-bold mb-3 text-lg block">{title}</span>
      {children}
    </section>
  );
}

export default FooterSection;
