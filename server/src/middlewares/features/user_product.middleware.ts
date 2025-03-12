import SHARED_MESSAGES from "@/constants/messages";

import { fileAuthorization } from "../authorization.middleware";

export function imageAuthorization() {
  return fileAuthorization({
    mimeChecker: (mime) => mime.startsWith("image/"),
    invalidMessage: SHARED_MESSAGES.general.invalidFileType("Image"),
  });
}
