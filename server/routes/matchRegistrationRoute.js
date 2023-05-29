const router = require("express").Router();
const Match = require("../models/matchModel");
const RegisterMatch = require("../models/registerMatchModel");
const authMiddleware = require("../middlewares/authMiddleware");

// make registration

router.post("/", authMiddleware, async (req, res) => {
    try {
        req.body.user = req.body.userId;
        const checkMatch = await Match.findById(req.body.match);
        if (checkMatch.registeredUsers.includes(req.body.userId)) {
          return res.send({
            message: "Ви вже зареєстровані на цей матч",
            success: false,
            data: null,
          });
        }
        else if(checkMatch.registeredUsers.length == checkMatch.partisipants) {
            return res.send({
                message: "Закінчились місця для реєстрації",
                success: false,
                data: null,
              });
        }

        const newRegisterMatch = RegisterMatch(req.body);
        await newRegisterMatch.save();

        await Match.findOneAndUpdate({_id: req.body.match}, {
            $push: {registeredUsers: req.body.userId}
        });
        res.status(200).send({ message: "Ви успішно зареєструвалися на цей матч", success: true });
    } 
    catch (error) {
        res.status(500).send({ message: error.message, success: false });
    }
});

// get registration by userId

router.get("/get-registration-by-userId", authMiddleware, async (req, res) => {
  try {

      const matches = await RegisterMatch.find({user: req.body.userId}).populate({
        path: "match",
        populate: {
          path: "createdBy"
        },
      });
      res.status(200).send({ data: matches.map((match) => match.match), success: true });
    } 
    catch (error) {
      res.status(500).send({ message: error.message, success: false });
    }
});

// delete match

router.delete("/delete-registration", authMiddleware, async (req, res) => {
  try {
    await RegisterMatch.findOneAndDelete({ user: req.body.userId, match: req.body.match });
    await Match.findOneAndUpdate({_id: req.body.match},
      { $pull: { registeredUsers: req.body.userId } }
    );
    res.status(200).send({ message: "Ви успішно скасували реєстрацію на цей матч", success: true });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// get all registration

router.get("/get-all-registration", authMiddleware, async (req, res) => {
  try {
      const matches = await Match.find().populate('createdBy')
      res.status(200).send({ data: matches, success: true });
    } 
    catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
});

module.exports = router;