import { FieldValues } from "react-hook-form";

import { Form, FormProps } from "@/components/form";
import { Link } from "@/components/utility";

type Content = {
  title: string;
  links: readonly { to: string; text: string }[];
};

export type Auth_UserFormProps<T extends FieldValues> = FormProps<T> & {
  content: Content;
};

export function Auth_UserAccountForm<T extends FieldValues>({
  children,
  content,
  ...restProps
}: Auth_UserFormProps<T>) {
  return (
    <>
      <h3 className="text-xl font-bold mb-6 text-center">{content.title}</h3>
      <Form
        containerProps={{
          className: "w-full px-[25px] flex flex-col mb-3",
        }}
        {...restProps}
      >
        {children}
      </Form>
      {content.links.map((link) => (
        <Link key={link.to} to={link.to} className="mb-2">
          {link.text}
        </Link>
      ))}
    </>
  );
}
