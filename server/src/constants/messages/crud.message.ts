const crudMessages = {
  create: (message: string) => `${message} با موفقیت ایجاد شد.`,
  delete: (message: string) => `${message} با موفقیت حذف شد.`,
  update: (message: string) => `${message} با موفقیت به‌روزرسانی شد.`,
  noFieldUpdated: "برای به‌روزرسانی باید حداقل یک فیلد را ویرایش کنید",
} as const;

export default crudMessages;
