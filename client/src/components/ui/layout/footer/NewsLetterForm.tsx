import { useForm } from "react-hook-form";

import { Form, InputField, SubmitButton } from "@/components/form";

import FooterSection from "./FooterSection";

function NewsletterForm() {
  const formMethods = useForm();

  return (
    <FooterSection title="عضویت در خبرنامه">
      <Form
        formMethods={formMethods}
        handleOnSubmit={() => {}}
        submitButton={<SubmitButton className="mt-5">عضویت</SubmitButton>}
      >
        <InputField
          controllerName="email"
          label="ایمیل"
          fieldProps={{ autoFocus: false }}
        />
      </Form>
    </FooterSection>
  );
}

export default NewsletterForm;
