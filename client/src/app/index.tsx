import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "@/components/utility";
import AuthProvider from "@/features/auth/components/AuthProvider";
import Router from "@/router";

export const test = "Asdasdasd";

export const test2 = "asdasdasd";

export const test3 = "asdasdasd";

export const test4 = "Asdasdasd";

export const test5 = "Asdasdasdasdadas";

export const test6 = "asdasdasdasd";

export const test7 = "Asdasdasd";

export const test8 = "Asdasdasdasdasd";

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
