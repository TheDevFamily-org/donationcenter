import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(403, "User not found!"));

    if (req.userId !== user._id.toString()) {
      return next(createError(403, "Your are not authenticated!"));
    }
    await User.findByIdAndDelete(req.params.id);
    console.log(req);
    res.status(200).send("deleted.");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};

// export const updateUser = async (req, res, next) => {
//   try {
//     const user = await User.findById({ _id: req.userId });
//     if (!user) return next(createError(403, "User not found!"));
//     const updateUser = await User.findByIdAndUpdate(
//       { _id: user._id },
//       { $set: { phone: req.body.phone, address: req.body.address } }
//     );
//     res.status(200).send(updateUser);
//   } catch (err) {
//     next(err);
//   }
// };

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isAdmin: false , status : 'active'});
    if (!users) return next(createError(404, "There is no any user found"));
    else return res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

export const getAllAdmins = async (req, res, next) => {
  try {
    const users = await User.find({ isAdmin: true, status : 'active'});
    if (!users) return next(createError(404, "There is no any admin found"));
    else return res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

export const blockUserOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return next(createError(404, "User not found"));

    const updateUser = await findByIdAndUpdate(
      { _id: user._id },
      { $set: { status: "blocked" } }
    );
  } catch (err) {
    next(err);
  }
};