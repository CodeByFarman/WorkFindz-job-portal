import jwt from "jsonwebtoken";

export const validateSession = (req, res) => {
  try {
    // Read the token from the cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token found. Please log in.",
      });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token. Please log in again.",
        });
      }

      // If token is valid, return success
      return res.status(200).json({
        success: true,
        message: "Session is valid",
        userId: decoded.userId, // Include user ID if needed
      });
    });
  } catch (error) {
    console.error("Error validating session:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};
