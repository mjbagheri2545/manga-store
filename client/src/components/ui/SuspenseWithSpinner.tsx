import { PropsWithChildren, Suspense } from "react";

import { SpinnerContainer } from "./SpinnerContainer";

function SuspenseWithSpinner({ children }: PropsWithChildren) {
  return <Suspense fallback={<SpinnerContainer />}>{children}</Suspense>;
}

export default SuspenseWithSpinner;
