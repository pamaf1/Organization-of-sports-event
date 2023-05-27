const router = require("express").Router();
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// registration new user

router.post("/registration",async (req, res) => {
    try {
      const userAlreadyExist = await User.findOne({ email: req.body.email });
      const loginAlreadyExist = await User.findOne({ login: req.body.login });
      if (userAlreadyExist) {
        return res.send({
          message: "Користувач з такою електроною адресою вже існує",
          success: false,
          data: null,
        });
      }
      if (loginAlreadyExist) {
        return res.send({
          message: "Користувач з таким логіном вже існує",
          success: false,
          data: null,
        });
      }
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashPassword;
      const newUser = new User(req.body);
      await newUser.save();
      res.send({
        message: "Обліковий запис успішно створено",
        success: true,
        data: null,
      });
    } catch (error) {
      res.send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  });

// login user

router.post("/login", async (req, res) => {
    try {
      const userExist = await User.findOne({ email: req.body.email });
      if (!userExist) {
        return res.send({
          message: "Такого користувача не існує",
          success: false,
          data: null,
        });
      }
  
      if (userExist.isBanned) {
        return res.send({
          message: "Ваш обліковий запис заблоковано",
          success: false,
          data: null,
        });
      }
  
      const passwordCompare = await bcrypt.compare(
        req.body.password,
        userExist.password
      );
  
      if (!passwordCompare) {
        return res.send({
          message: "Неправильний пароль! Спробуйте ще раз.",
          success: false,
          data: null,
        });
      }
  
      const token = jwt.sign({ userId: userExist._id }, process.env.jwt_secret, {
        expiresIn: "1d",
      });
      res.send({
        message: "Авторизація пройшла успішно",
        success: true,
        data: token,
      });

    } catch (error) {
      res.send({
        message: error.message,
        success: false,
        data: null,
      });
    }
});

router.post("/get-user-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({message: "User fetched successfully", success: true, data: user});
  } catch (error) {
    res.send({ message: error.message, success: false, data: null,
    });
  }
});


// get all user

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
      const matches = await User.find();
      res.status(200).send({ data: matches, success: true });
    } 
    catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
});

// get user by :id

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send({ data: user, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false, data: null,
    });
  }
});

// update user

router.put("/update-user", authMiddleware, async (req, res) => {
  try {
    const updatUser = await User.findByIdAndUpdate(req.body._id, req.body);
    return res.status(200).send({
      success: true,
      message: "Дані користувача оновлено успішно",
      data: updatUser,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;