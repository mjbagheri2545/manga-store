import { FallbackProps } from "react-error-boundary";

import { XIcon } from "lucide-react";

import { Alert, Button } from "../utility";

function ErrorBoundaryFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4">
      <Alert
        type="error"
        containerProps={{ className: "text-lg w-full" }}
        Icon={XIcon}
      >
        {"message" in error
          ? error.message
          : "Sorry, Something went wrong. Click the reset button bellow."}
      </Alert>
      <Button isWide onClick={resetErrorBoundary}>
        reset
      </Button>
    </div>
  );
}

export default ErrorBoundaryFallback;
