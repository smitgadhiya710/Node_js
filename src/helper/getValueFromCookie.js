function getValueFromCookie(cookie, findvalue) {
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

exports.getValueFromCookie = { getValueFromCookie };
