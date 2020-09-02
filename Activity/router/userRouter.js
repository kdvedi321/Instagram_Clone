const userRouter = new express.Router();
let { createUser, updateUUser, deleteUser, getUser } = require("../controller/userController");
// user routes
// /:user_id
// read => GET ONE
userRouter.post("/", createUser);
userRouter.route("/:user_id").get(getUser).patch(updateUser).delete(deleteUser);
module.exports = userRouter;