async function createSlug(string, model) {
  const specialChar = ["@", "#", "'", '"', "/", "%", " ", "$"];

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
  // return slug;

  const count = await model
    .find({
      $or: [
        {
          slug: { $regex: new RegExp(`^${slug}`) },
        },
        {
          slug: { $regex: new RegExp(`^${slug}(?:-\d+)?$`) },
        },
      ],
    })
    .countDocuments();

  if (count > 0) slug = `${slug}-${count}`;

  return slug;
}

exports.slug = { createSlug };
