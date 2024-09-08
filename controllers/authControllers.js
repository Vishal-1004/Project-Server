const user = require("../models/userSchema");

// sample API
exports.api = async (req, res) => {
  res.status(200).json({ message: "Server is working" });
};

// register api
exports.register = async (req, res) => {
  const { name, registrationNo, password } = req.body;

  if (!name || !registrationNo || !password) {
    return res.status(400).json({ message: "Please enter all input fields" });
  }

  try {
    const existingUser = await user.findOne({ registrationNo });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    const newUser = new user({ name, registrationNo, password });
    await newUser.save();

    return res.status(200).json({ message: "User registered succesfully" });
  } catch (error) {
    console.log("Error during registering a user: ", error);
    return res.status(400).json({ message: "Internal Server Error" });
  }
};

// login api
exports.login = async (req, res) => {
  const { registrationNo, password } = req.body;

  if (!registrationNo || !password) {
    return res.status(400).json({ message: "Please enter all input fields" });
  }

  try {
    const existingUser = await user.findOne({ registrationNo });

    if (!existingUser) {
      return res.status(400).json({ message: "Please register first" });
    }

    if (password != existingUser.password) {
      return res.status(400).json({ message: "Wrong password" });
    } else {
      return res
        .status(200)
        .json({ message: "Login successfull", data: existingUser });
    }
  } catch (error) {
    console.log("Error during loginin a user: ", error);
    return res.status(400).json({ message: "Internal Server Error" });
  }
};

// update password api
exports.updatePassword = async (req, res) => {
  const { registrationNo, currentPassword, newPassword } = req.body;

  if (!registrationNo || !currentPassword || !newPassword) {
    return res.status(400).json({ message: "Please enter all input fields" });
  }

  try {
    const existingUser = await user.findOne({ registrationNo });

    if (existingUser.password != currentPassword) {
      return res.status(400).json({ message: "Wrong password" });
    } else {
      existingUser.password = newPassword; // update the password
      await existingUser.save(); // save the updated user document

      return res.status(200).json({ message: "Password updated successfully" });
    }
  } catch (error) {
    console.log("Error during password updation: ", error);
    return res.status(400).json({ message: "Internal Server Error" });
  }
};

// delete account api
exports.deleteAccount = async (req, res) => {
  const { registrationNo } = req.body;

  if (!registrationNo) {
    return res.status(400).json({ message: "Please enter all input fields" });
  }

  try {
    const existingUser = await user.findOne({ registrationNo });

    if (!existingUser) {
      return res.status(400).json({ message: "User doesnot exist" });
    } else {
      await user.deleteOne({ registrationNo }); // delete the user document
      return res.status(200).json({ message: "Account deleted successfully" });
    }
  } catch (error) {
    console.log("Error during deletion of account: ", error);
    return res.status(400).json({ message: "Internal Server Error" });
  }
};
