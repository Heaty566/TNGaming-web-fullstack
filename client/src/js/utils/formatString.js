export const UpperCaseFirstLetter = (string = "") => {
  return string.charAt(0).toUpperCase() + string.slice(1, string.length);
};

export const UpperCaseEveryLetter = (string = "") => {
  return string
    .split(" ")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1, string.length))
    .join(" ");
};
