import { Button } from "@/components/utility";
import { GetAllTranslatorBase } from "@/contexts/ProductContext";

type TranslatorCardType = {
  translator: GetAllTranslatorBase;
};

function TranslatorCard({ translator }: TranslatorCardType) {
  return (
    <div className="flex justify-between items-center flex-wrap gap-4 w-full">
      <span>{translator.fullName}</span>
      <span>{translator.translatedChaptersCount} فصل</span>
      <Button isWide isLinkComponent to="#">
        مشاهده پروفایل
      </Button>
    </div>
  );
}

export default TranslatorCard;
