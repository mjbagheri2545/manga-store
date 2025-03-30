import { Outlet, useParams } from "react-router-dom";

import { EntitiesProvider } from "@/components/ui/crud";
import { Alert } from "@/components/utility";
import { Chapter } from "@/types";

function ChapterPageWrapper() {
  const { productId } = useParams();

  if (productId == null) {
    return <Alert>آیدی محصول یافت نشد</Alert>;
  }

  return (
    <EntitiesProvider<Chapter>>
      <Outlet />
    </EntitiesProvider>
  );
}

export default ChapterPageWrapper;
