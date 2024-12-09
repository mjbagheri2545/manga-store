export function camelCaseToLabelCase(camelCase: string) {
  return camelCase
    .split("")
    .map((character, index) => {
      if (index === 0) {
        return character.toUpperCase();
      }
      if (character.toUpperCase() === character) {
        return ` ${character.toLowerCase()}`;
      }
      return character;
    })
    .join("");
}
