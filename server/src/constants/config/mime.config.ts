function createMimeConfig() {
  return {
    image: [
      { name: "JPEG, JPG", mime: "image/jpeg" },
      { name: "PNG", mime: "image/png" },
      { name: "SVG", mime: "image/svg+xml" },
      { name: "WEBP", mime: "image/webp" },
      { name: "GIF", mime: "image/gif" },
    ],
  } as const;
}

export default createMimeConfig;
