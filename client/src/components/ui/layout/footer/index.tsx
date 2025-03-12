import enamadSrc from "@/assets/images/enamad.png";
import { FOOTER_CONTENT } from "@/constants/content";

import FooterLinks from "./FooterLinks";
import FooterSection from "./FooterSection";
import NewsletterForm from "./NewsLetterForm";

function Footer() {
  return (
    <footer className="bg-dark">
      <div className="flex flex-wrap p-2.5 mx-auto max-w-[1400px] w-full">
        <div className="flex flex-wrap gap-y-10 py-2.5">
          <FooterSection title="درباره مجموعه">
            <p className="text-wrap">{FOOTER_CONTENT.aboutCompany}</p>
          </FooterSection>
          <FooterLinks />
          <FooterSection title="نماد اعتماد">
            <img src={enamadSrc} className="w-28" alt="enamad" />
          </FooterSection>
          <NewsletterForm />
        </div>
        <div className="flex items-center justify-center w-full p-2.5">
          &#169;
          <p className="mr-0.5 max-[400px]:text-sm">
            {FOOTER_CONTENT.copyRightText}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
