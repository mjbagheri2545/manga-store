function createCrudMessages() {
  return {
    create: (message: string) => `${message} با موفقیت ساخته شد.`,
    delete: (message: string) => `${message} با موفقیت حذف شد.`,
    update: (message: string) => `${message} با موفقیت به روز رسانی شد.`,
  } as const;
}

export default createCrudMessages;
