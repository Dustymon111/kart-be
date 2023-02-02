import  verifySignUp  from "../middlewares/verifySignUp.js";
import controller from "../controllers/AuthController.js";
import cookieParser from "cookie-parser";

export const authRoute = (app) => {
  app.use(cookieParser())

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.get("/api/auth/signin", (req, res) => {
    const token = req.cookies
    console.log(token);
    res.status(200).json({message: token})
  })

  app.post("/api/auth/signin", controller.signin);
};