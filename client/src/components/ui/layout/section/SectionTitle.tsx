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
  return (
    <>
      {title != null ? (
        <div className="mb-5 flex gap-3 h-fit">
          <span className="block w-1 rounded-lg bg-primary" />
          <h4 className="text-lg font-semibold">{title}</h4>
        </div>
      ) : null}
      {"linkProps" in restProps ? (
        <Link
          {...restProps.linkProps}
          className={twMerge("ml-3", restProps.linkProps.className)}
        />
      ) : null}
    </>
  );
}
