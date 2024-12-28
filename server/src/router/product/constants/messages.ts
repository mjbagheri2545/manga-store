const MESSAGES = {
  delete: (name: string) => `محصول با ${name} با موفقیت حذف شد.`,
  create: (name: string) => `محصول با ${name} با موفقیت ساخته شد.`,
  update: (name: string) => `محصول با ${name} با موفقیت به روز رسانی شد.`,
  updateRating: "نظر شما با موفقیت ثبت شد.",
  invalidProductImage:
    "تصویر محصول نامعتیر است، فقط JPEG, JPG, PNG, GIF, SVG مجاز هستند.",
} as const;

export default MESSAGES;
