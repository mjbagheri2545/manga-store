import PATH from "@/constants/path";
import { HTTP } from "@/lib/http";
import {
  Chapter,
  PaginateQueryWithSort,
  TGetAllResponse,
  WithOnUploadProgress,
} from "@/types";

import { CreateChapterData } from "../schemas";

export type ChapterResponse = {
  chapter: Chapter & { translator: { id: string } };
};

export type GetAllChapterBase = Chapter;
export type GetAllChaptersResponse = TGetAllResponse<{
  chapters: GetAllChapterBase[];
}>;

type ChapterBaseOptions = {
  productId: string;
};

type GetAllChaptersOptions = ChapterBaseOptions & {
  query?: PaginateQueryWithSort;
};

type CreateChapterOptions = ChapterBaseOptions &
  WithOnUploadProgress & {
    data: CreateChapterData;
  };

type UpdateChapterOptions = ChapterBaseOptions &
  WithOnUploadProgress & {
    id: string;
    data: Partial<CreateChapterData>;
  };

export type GetTranslatorsResponse = {
  translators: { fullName: string; id: string }[];
};

class ChapterApi {
  getAll({ query, productId }: GetAllChaptersOptions) {
    return HTTP.get<GetAllChaptersResponse>(PATH.chapter.api(productId), {
      params: query,
    });
  }

  getById({ id, productId }: ChapterBaseOptions & { id: string }) {
    return HTTP.get<ChapterResponse>(`${PATH.chapter.api(productId)}/${id}`);
  }

  create({ data, productId, onUploadProgress }: CreateChapterOptions) {
    return HTTP.post<{ id: string }>(PATH.chapter.api(productId), {
      data,
      onUploadProgress,
      headers: { "Content-Type": "multipart/form-data" },
      timeout: Number.POSITIVE_INFINITY,
    });
  }

  update({ id, data, onUploadProgress, productId }: UpdateChapterOptions) {
    return HTTP.put<{ id: string }>(`${PATH.chapter.api(productId)}/${id}`, {
      data,
      onUploadProgress,
      headers: { "Content-Type": "multipart/form-data" },
      timeout: Number.POSITIVE_INFINITY,
    });
  }

  delete({ id, productId }: ChapterBaseOptions & { id: string }) {
    return HTTP.delete<{ id: string }>(`${PATH.chapter.api(productId)}/${id}`);
  }

  getTranslators() {
    return HTTP.get<GetTranslatorsResponse>(PATH.user.getTranslators);
  }
}

const chapterApi = new ChapterApi();

export default chapterApi;
