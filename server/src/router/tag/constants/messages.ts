const MESSAGES = {
  delete: (name: string) => `ژانر ${name} با موفقیت حذف شد.`,
  create: (name: string) => `ژانر ${name} با موفقیت ساخته شد.`,
  update: (name: string) => `ژانر ${name} با موفقیت به روز رسانی شد.`,
} as const;

export default MESSAGES;
