import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { twMerge } from "tailwind-merge";

import { InputField } from "@/components/form";
import { Button } from "@/components/utility";
import PATH from "@/constants/path";
import { PropsWithContainer } from "@/types";

function SearchField({ containerProps }: PropsWithContainer) {
  const [searchParams] = useSearchParams();
  const [localProductName, setLocalProductName] = useState(
    searchParams.get("productName") ?? ""
  );
  const navigate = useNavigate();

  function handleOnSearch() {
    navigate({
      pathname: PATH.base.product,
      search: `productName=${localProductName}`,
    });
  }

  return (
    <div
      {...containerProps}
      className={twMerge("flex w-full", containerProps?.className)}
    >
      <InputField
        containerProps={{ className: "flex-1" }}
        fieldProps={{
          onChange: (e) => setLocalProductName(e.target.value),
          placeholder: "نام محصول ...",
          value: localProductName,
          className: "rounded-tl-none rounded-bl-none !outline-none",
        }}
      />
      <Button
        onClick={handleOnSearch}
        className="rounded-tr-none rounded-br-none"
      >
        جست و جو
      </Button>
    </div>
  );
}

export default SearchField;
