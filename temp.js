// const createSlug = (string) => {
//   //   return string.replaceAll(" ", "-");

//   const specialChar = ["@", "#", "'", '"', "/", "%", "$"];

//   let slug = "";

//   for (let i = 0; i < string.length; i++) {
//     if (specialChar.includes(string[i])) {
//       if (
//         i !== 0 &&
//         i !== string.length - 1 &&
//         !specialChar.includes(string[i - 1])
//       )
//         slug += "-";
//     } else {
//       slug += string[i];
//     }
//   }
//   return slug;
// };

// console.log(createSlug("@abc@cdc%cdmk@"));

function createSlug(string) {
  return string
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .toLowerCase();
}

console.log(createSlug("@Abc@cdc%cdmk@"));
