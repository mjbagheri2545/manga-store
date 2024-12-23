import { ToastContainer as Container } from "react-toastify";

import CloseButton from "./CloseButton";

import "react-toastify/dist/ReactToastify.min.css";
import "./style.css";

function ToastContainer() {
  return (
    <Container
      position="top-center"
      theme="dark"
      closeButton={CloseButton}
      limit={4}
      newestOnTop
    />
  );
}

export default ToastContainer;
