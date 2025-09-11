function createSlug(string) {
  //   return string.replaceAll(" ", "-");

  const specialChar = ["@", "#", "'", '"', "/", "%", "$"];

  let slug = "";

  for (let i = 0; i < string.length; i++) {
    if (specialChar.includes(string[i])) {
      if (
        i !== 0 &&
        i !== string.length - 1 &&
        !specialChar.includes(string[i - 1])
      )
        slug += "-";
    } else {
      slug += string[i];
    }
  }
  return slug;
}

exports.createSlug = { createSlug };

// function createSlug(string) {
//   return string
//     .replace(/[^a-zA-Z0-9]+/g, "-")
//     .replace(/^-+/, "")
//     .replace(/-+$/, "")
//     .toLowerCase();
// }

// console.log(createSlug("@Abc@cdc%cdmk@"));

const cookie =
  "Cookie_1=value; Cookie_2=value111; refresh-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmU4MzcyNTI0YjIyNTFkZTY5M2IxNCIsInVzZXJOYW1lIjoiVG9rZW4gVGVzdGluZyIsImlhdCI6MTc1NzU5MTI4MSwiZXhwIjoxNzU4MTk2MDgxfQ.qLiOmU4SRsoODpv-KR4U_Wo8QGa0KhZ28AdO1v59Tcg";

function findToken(cookie, findvalue) {
  const string = cookie
    .split(";")
    .map((cookie) => {
      return cookie.split("=");
    })
    .find(([key, _]) => {
      return key.trim() === findvalue;
    });

  return string[1];
}

console.log(findToken(cookie, "Cookie_2"));
