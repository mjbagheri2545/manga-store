import env from "@/constants/env";

type ChapterFileRenderProps = {
  link: string;
};

export function ChapterFileRender({ link }: ChapterFileRenderProps) {
  return (
    <embed
      src={`${env.VITE_SERVER_END_POINT}/${link}`}
      className="w-full min-h-[600px]"
      type="application/pdf"
    ></embed>
  );
}
