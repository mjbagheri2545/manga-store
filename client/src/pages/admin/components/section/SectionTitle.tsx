import { twMerge } from "tailwind-merge";

import { Link } from "@/components/utility";
import { LinkProps } from "@/components/utility/Link";

export type SectionTitleProps =
  | {
      title?: string;
    }
  | {
      title: string;
      linkProps: LinkProps;
    };

function SectionTitle(props: SectionTitleProps) {
  // with discriminated union types we sure title is string
  if ("linkProps" in props) {
    return (
      <div className="flex justify-between">
        <SectionTitleChildren {...props} />
      </div>
    );
  }

  return <SectionTitleChildren {...props} />;
}

export default SectionTitle;

function SectionTitleChildren({ title, ...restProps }: SectionTitleProps) {
  const isLinkProvided = "linkProps" in restProps;

  return (
    <>
      {title != null ? (
        <h4 className="mr-3 mb-5 text-lg font-semibold">{title}</h4>
      ) : null}
      {isLinkProvided ? (
        <Link
          {...restProps.linkProps}
          className={twMerge("ml-3", restProps.linkProps.className)}
        />
      ) : null}
    </>
  );
}
