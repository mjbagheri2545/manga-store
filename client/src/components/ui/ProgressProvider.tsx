import { PropsWithChildren, useState } from "react";

import { ProgressContext } from "@/contexts/ProgressContext";

function ProgressProvider({ children }: PropsWithChildren) {
  const [progress, setProgress] = useState(0);
  const isUploading = progress > 0 && progress < 100;

  return (
    <ProgressContext.Provider value={{ progress, setProgress, isUploading }}>
      {children}
    </ProgressContext.Provider>
  );
}

export default ProgressProvider;
