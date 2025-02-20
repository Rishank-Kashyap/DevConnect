const express = require("express");
const userAuth = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const disallowedFields = validateEditProfileData(req);
    if (disallowedFields.length > 0) {
      throw new Error(
        `Updating ${disallowedFields.join(", ")} is not allowed.`
      );
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName} your profile is updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/editPassword", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { currentPassword, newPassword } = req.body;

    const isCurrentPasswordCorrect = await loggedInUser.validatePassword(
      currentPassword
    );

    if (!isCurrentPasswordCorrect) {
      return res
        .status(400)
        .json({ error: "Please enter correct current Password" });
    }

    if (!validator.isStrongPassword(newPassword)) {
      return res
        .status(400)
        .json({ error: "Please enter a strong New Password" });
    }

    loggedInUser.password = await bcrypt.hash(newPassword, 10);

    await loggedInUser.save();

    res
      .status(200)
      .json({
        success: `${loggedInUser.firstName}, your password has been updated successfully`,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = profileRouter;
