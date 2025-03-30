import { List, ListItem } from "@/components/utility/list";
import { GetAllTranslatorBase } from "@/contexts/ProductContext";

import TranslatorCard from "./TranslatorCard";

type TranslatorsListProps = {
  translators: GetAllTranslatorBase[];
};

function TranslatorsList({ translators }: TranslatorsListProps) {
  return (
    <List className="gap-2">
      {translators.map((translator) => (
        <ListItem
          key={translator.id}
          containerProps={{ className: "bg-dark-body" }}
        >
          <TranslatorCard translator={translator} />
        </ListItem>
      ))}
    </List>
  );
}

export default TranslatorsList;
