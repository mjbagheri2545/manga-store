import { twMerge } from "tailwind-merge";

import { GetAllChapterBase } from "../api";
import { ChapterCard } from "./ChapterCard";

type ChapterListProps = {
  chapters: GetAllChapterBase[];
  containerClassName?: string;
};

function ChapterList({ chapters, containerClassName }: ChapterListProps) {
  return (
    <div
      className={twMerge(
        "flex-1 w-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(210px,1fr))]",
        containerClassName
      )}
    >
      {chapters.map((chapter) => (
        <ChapterCard
          key={chapter.id}
          chapter={chapter}
          cardProps={{ className: "size-full" }}
        />
      ))}
    </div>
  );
}

export default ChapterList;
