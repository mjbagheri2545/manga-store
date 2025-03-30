import { Section, SectionTitle } from "@/components/ui/layout";
import { Link } from "@/components/utility";
import PATH from "@/constants/path";
import { useProductGroups } from "@/contexts/ProductGroupsContext";

function TagsPage() {
  const { tags } = useProductGroups();
  return (
    <Section>
      <SectionTitle title="همه ژانر ها" />
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
        {tags.map((tag) => (
          <Link
            key={tag.id}
            variant="navigation"
            to={PATH.product.byTag(tag.slug)}
            className="px-5 py-2.5 w-fit"
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </Section>
  );
}

export default TagsPage;
