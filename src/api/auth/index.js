import { loginUser } from "../../services/auth/index.js";
import validator from "../../middleware/validator.js";
import { loginSchema } from "../../schemas/auth.js";
import { safeWrap } from "../../utils/index.js";

const loginUserHandler = (req, res) => {
  const { email, password } = req.body;
  const user = loginUser(email, password);
  return res.json(user);
};

export default function registerAuthRoutes(router) {
  router.post(
    "/api/v1/auth/login",
    validator(loginSchema),
    safeWrap(loginUserHandler)
  );
}
