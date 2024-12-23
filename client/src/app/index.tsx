import { BrowserRouter } from "react-router-dom";

import ToastContainer from "@/components/utility/toastContainer";
import AuthProvider from "@/features/auth/components/AuthProvider";
import UserProvider from "@/features/user/components/UseProvider";
import Router from "@/router";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <Router />
          <ToastContainer />
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
