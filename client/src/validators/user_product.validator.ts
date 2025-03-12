import USER_PRODUCT_MESSAGES from "@/constants/messages/features/user_product.message";

import { fileValidator } from ".";

export function imageValidator(label: string) {
  return fileValidator(label).refine(
    (file) => file.size === 0 || file.type.startsWith("image/"),
    USER_PRODUCT_MESSAGES.invalidImage
  );
}
