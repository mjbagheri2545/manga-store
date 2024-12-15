import Form, { FormProps } from "@/components/form/Form";

function AuthForm({ children, ...restProps }: FormProps) {
  return (
    <Form
      containerProps={{
        className: "w-full px-[25px] flex flex-col mb-3",
      }}
      {...restProps}
    >
      {children}
    </Form>
  );
}

export default AuthForm;
