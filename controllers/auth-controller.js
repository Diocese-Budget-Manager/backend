const firebase = require("../helpers/firebase");
const Users = require("../models/User");

const login = async (req, res) => {

  try {

    const token = req.body.token;
    // const token = authUser.accessToken;

    const decodedToken = await firebase.verifyIdToken(token);
    uid = decodedToken["uid"];

    const user = await Users.findOne({ uid: uid });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(401).json({ error: "User not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error " + error.message });
  }
};

const sendSignUpLink = async (req, res) => {
  const { email } = req.body;
  let firebaseUser;
  
  try {
    firebaseUser = await firebase.createUser({
      email: email,
      password: "123456",
    });
    const token = await firebase.createCustomToken(firebaseUser.uid);

    res.status(201).json({
      message: "User created successfully",
      firebaseUser,
      token,
    });
    // console.log(link);
    // return res.status(200).json({ message: "Email sent successfully " + link });
  } catch (error) {
    // Rollback Firebase user if created
    if (firebaseUser) {
      try {
        await firebase.deleteUser(firebaseUser.uid);
        console.log(`Rolled back Firebase user: ${firebaseUser.uid}`);
      } catch (deleteError) {
        console.error("Failed to delete Firebase user:", deleteError);
      }
    }
    return res.status(500).json({ error: error.message });
  }
};

exports.login = login;
exports.sendSignUpLink = sendSignUpLink;
