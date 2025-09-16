async function getDataWithParams(req, model) {
  const { sort, ...restPara } = req.query;
  const sortQuery = { createdAt: -1 };
  const andArray = [];
  const orArray = [];

  if (sort) {
    sort.split(",").map((i) => {
      const key = i.replace("-", "");
      sortQuery[key] = i.includes("-") ? -1 : 1;
    });
  }

  if (restPara) {
    Object.entries(restPara).map(([key, value]) => {
      value.split(",").forEach((val) => {
        if (value !== "All")
          return key.includes("and_")
            ? andArray.push({ [key.replace("and_", "")]: val })
            : orArray.push({ [key.replace("or_", "")]: val });
      });
    });
  }

  const matchedQuery = {};

  if (andArray.length > 0) matchedQuery.$and = andArray;
  if (orArray.length > 1) matchedQuery.$or = orArray;

  return Object.keys(req.query).length !== 0 &&
    (andArray.length >= 1 || orArray.length > 1)
    ? await model.aggregate([
        {
          $match: matchedQuery,
        },
        {
          $sort: sortQuery,
        },
      ])
    : await model.find(orArray[0]).sort(sortQuery);
}

exports.getDataWithParams = getDataWithParams;
