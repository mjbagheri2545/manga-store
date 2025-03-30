import PATH from "@/constants/path";
import { HTTP } from "@/lib/http";
import {
  Chapter,
  PaginateQuery,
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

type CreateChapterOptions = WithOnUploadProgress & {
  data: CreateChapterData;
};

type UpdateChapterOptions = WithOnUploadProgress & {
  id: string;
  data: Partial<CreateChapterData>;
};

type ChapterQuery = PaginateQuery & {
  sort?: string;
};

type ChapterBaseOptions = {
  productId: string;
};

export type GetTranslatorsResponse = {
  translators: { fullName: string; id: string }[];
};

class ChapterApi {
  getAll({ query, productId }: { query?: ChapterQuery } & ChapterBaseOptions) {
    return HTTP.get<GetAllChaptersResponse>(PATH.chapter.api(productId), {
      params: query,
    });
  }

  getById({ id, productId }: { id: string } & ChapterBaseOptions) {
    return HTTP.get<ChapterResponse>(`${PATH.chapter.api(productId)}/${id}`);
  }

  create({
    data,
    productId,
    onUploadProgress,
  }: CreateChapterOptions & ChapterBaseOptions) {
    return HTTP.post<{ id: string }>(PATH.chapter.api(productId), {
      data,
      onUploadProgress,
      headers: { "Content-Type": "multipart/form-data" },
      timeout: Number.POSITIVE_INFINITY,
    });
  }

  update({
    id,
    data,
    onUploadProgress,
    productId,
  }: UpdateChapterOptions & ChapterBaseOptions) {
    return HTTP.put<{ id: string }>(`${PATH.chapter.api(productId)}/${id}`, {
      data,
      onUploadProgress,
      headers: { "Content-Type": "multipart/form-data" },
      timeout: Number.POSITIVE_INFINITY,
    });
  }

  delete({ id, productId }: { id: string } & ChapterBaseOptions) {
    return HTTP.delete<{ id: string }>(`${PATH.chapter.api(productId)}/${id}`);
  }

  getTranslators() {
    return HTTP.get<GetTranslatorsResponse>(PATH.user.getTranslators);
  }
}

const chapterApi = new ChapterApi();

export default chapterApi;
