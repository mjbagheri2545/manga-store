const MESSAGES = {
  delete: (name: string) => `محصول با ${name} با موفقیت حذف شد.`,
  create: (name: string) => `محصول با ${name} با موفقیت ساخته شد.`,
  update: (name: string) => `محصول با ${name} با موفقیت به روز رسانی شد.`,
  updateRating: "نظر شما با موفقیت ثبت شد.",
  validation: { slug: (label: string) => `متاسفیم، ${label} یافت نشد.` },
} as const;

export default MESSAGES;
