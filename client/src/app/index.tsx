import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";

import { logError } from "@/api/logError.api";
import ErrorBoundaryFallback from "@/components/ui/ErrorBoundaryFallback";
import { ToastContainer } from "@/components/utility";
import AuthProvider from "@/features/auth/components/AuthProvider";
import Router from "@/router";

import "./index.css";

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onError={async (error, info) => {
        await logError({
          message: error.message,
          componentStack: info.componentStack ?? undefined,
        });
      }}
    >
      <BrowserRouter>
        <AuthProvider>
          <Router />
          <ToastContainer />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
