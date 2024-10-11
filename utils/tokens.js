const accessTokenExpires = 24 * 60 * 60;

let accessTokenOptions = {
  expires: new Date(Date.now() + accessTokenExpires * 1000),
  maxAge: accessTokenExpires * 1000,
  httpOnly: true,
  sameSite: true,
};

const sendToken = (user, statusCode, res) => {
  const accessToken = user.signAccessToken();
  res.cookie("accessToken", accessToken, accessTokenOptions);
  res.status(statusCode).json({ user, accessToken });
};

module.exports = { sendToken, accessTokenOptions };
