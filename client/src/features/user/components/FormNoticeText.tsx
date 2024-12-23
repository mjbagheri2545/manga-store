import { PropsWithChildren } from "react";

function FormNoticeText({ children }: PropsWithChildren) {
  return <p className="text-wrap leading-[1.625rem] mb-4">{children}</p>;
}

export default FormNoticeText;
