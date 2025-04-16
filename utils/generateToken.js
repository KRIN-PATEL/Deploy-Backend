import jwt from "jsonwebtoken";

export const generateToken = (res, user, message = "Logged in") => {
  // Create JWT token
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  // Set token in cookie with proper security flags for cross-origin HTTPS
  res
    .cookie("token", token, {
      httpOnly: true,                 // prevent client-side JS from accessing cookie
      secure: true,                   // required for HTTPS
      sameSite: "None",               // required for cross-site cookies
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
    .status(200)
    .json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      message,
    });
};
