import { useParams } from "react-router-dom";

function useChapterPageParams() {
  const { productId } = useParams();

  if (productId == null) {
    throw new Error(
      "You must use this hook with it's provider! (ChapterPageWrapper)"
    );
  }

  return { productId };
}

export default useChapterPageParams;
