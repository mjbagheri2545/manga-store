import RootProductCommentListSection from "@/features/productComment/components/productCommentsListSection/RootProductCommentListSection";
import RootProductCommentsProvider from "@/features/productComment/components/RootProductCommentsProvider";

function ProductCommentsPage() {
  return (
    <RootProductCommentsProvider>
      <RootProductCommentListSection />
    </RootProductCommentsProvider>
  );
}

export default ProductCommentsPage;
