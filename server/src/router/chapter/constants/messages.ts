const MESSAGES = {
  delete: (episode: number) => `فصل ${episode} با موفقیت حذف شد.`,
  create: (episode: number) => `فصل ${episode} با موفقیت ساخته شد.`,
  update: (episode: number) => `فصل ${episode} با موفقیت به روز رسانی شد.`,
  invalidChapterFile: "فایل فصل نامعتیر است، فقط PDF مجاز است.",
} as const;

export default MESSAGES;
