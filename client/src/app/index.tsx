import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "@/components/utility";
import AuthProvider from "@/features/auth/components/AuthProvider";
import Router from "@/router";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
