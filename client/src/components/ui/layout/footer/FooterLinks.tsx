import RenderItems from "@/components/ui/RenderItems";
import { List, ListItemLink } from "@/components/utility/list";

import FooterSection from "./FooterSection";

const LINKS = [
  {
    title: "لینک شماره 1",
    to: "#",
  },
  {
    title: "لینک شماره 2",
    to: "#",
  },
  {
    title: "لینک شماره 3",
    to: "#",
  },
  {
    title: "لینک شماره 4",
    to: "#",
  },
  {
    title: "لینک شماره 5",
    to: "#",
  },
  {
    title: "لینک شماره 6",
    to: "#",
  },
  {
    title: "لینک شماره 7",
    to: "#",
  },
];

function FooterLinks() {
  return (
    <FooterSection title="دسترسی سریع">
      <List className="grid grid-cols-2 gap-3">
        <RenderItems
          items={LINKS}
          renderItem={(item) => (
            <ListItemLink to={item.to}>{item.title}</ListItemLink>
          )}
        />
      </List>
    </FooterSection>
  );
}

export default FooterLinks;
