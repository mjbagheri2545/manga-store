// this function was copied from slugify library but
// i rewrote it to make dependencies smaller and
// as you can see the actual code is very smaller,
// if you go and see the code of slugify library

import charMap from "@/constants/slugifyCharMap";

function replaceChar(char: string, replacement: string) {
  let result = charMap[char] ?? char;
  if (result === replacement) result = " ";
  return result.replace(/[^\w\s$*_+~.()'"!\-:@]+/g, "");
}

function slugify(stringToSlugify: string, replacement = "-") {
  const slug = stringToSlugify
    .normalize()
    .split("")
    // replace characters based on charMap
    .reduce((result, char) => result + replaceChar(char, replacement), "");

  // Replace spaces with replacement character, treating multiple consecutive
  // spaces as a single space.
  const finalSlug = slug.trim().replace(/\s+/g, replacement);

  return finalSlug;
}

export default slugify;
