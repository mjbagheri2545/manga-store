import { useParams } from "react-router-dom";

import { ApiComponent } from "@/components/ui/api";
import { Section, SectionTitle } from "@/components/ui/layout";
import SingleProductLink from "@/components/ui/product/SingleProductLink";
import { Alert } from "@/components/utility";
import { useProduct } from "@/contexts/ProductContext";
import chapterApi, { ChapterResponse } from "@/features/chapter/api";
import { ChapterFileRender } from "@/features/chapter/components/ChapterFileRender";

function ChapterPage() {
  const { chapterId } = useParams();
  const product = useProduct();

  if (chapterId == null) {
    return <Alert type="error">آیدی فصل یافت نشد</Alert>;
  }

  return (
    <ApiComponent
      apiMethod={() =>
        chapterApi.getById({ id: chapterId, productId: product.id })
      }
      apiMethodOptions={{ dependencies: [chapterId, product.id] }}
    >
      {(data) => <ChapterPageChildren {...data} />}
    </ApiComponent>
  );
}

export default ChapterPage;

function ChapterPageChildren({ chapter }: ChapterResponse) {
  return (
    <Section>
      <SectionTitle title={`فصل ${chapter.episode} ام`}>
        <SingleProductLink />
      </SectionTitle>
      <ChapterFileRender link={chapter.chapterFile} />
    </Section>
  );
}
