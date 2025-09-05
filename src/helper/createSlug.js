exports.createSlug = (string) => {
  //   return string.replaceAll(" ", "-");

  const specialChar = ["@", "#"];

  let slug = "";

  for (let i = 0; i < string.length; i++) {
    if (!specialChar.includes(string[i])) {
      slug += slug + "-";
    }
  }
  return slug;
};
