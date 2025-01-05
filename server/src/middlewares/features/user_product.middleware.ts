import { fileAuthorization } from "../authorization.middleware";

export function imageAuthorization() {
  const allowedTypes = [
    { name: "JPEG, JPG", mime: "image/jpeg" },
    { name: "PNG", mime: "image/png" },
    { name: "SVG", mime: "image/svg+xml" },
    { name: "WEBP", mime: "image/webp" },
    { name: "GIF", mime: "image/gif" },
  ];
  return fileAuthorization(allowedTypes);
}
