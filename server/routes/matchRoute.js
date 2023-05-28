const router = require("express").Router();
const Match = require("../models/matchModel");
const RegisterMatch = require("../models/registerMatchModel");
const authMiddleware = require("../middlewares/authMiddleware");

// add match

router.post("/", authMiddleware, async (req, res) => {
    try {
        req.body.createdBy = req.body.userId;
        await Match.create(req.body);

        return res.status(200).send({ message: "Матч успішно додано", success: true });
    } 
    catch (error) {
        res.status(500).send({ message: error.message, success: false });
    }
});

// get match by userId

router.get("/get-match-by-userId", authMiddleware, async (req, res) => {
    try {
        const matches = await Match.find({createdBy: req.body.userId}).populate('createdBy').populate('registeredUsers')
        res.status(200).send({ data: matches, success: true });
      } 
      catch (error) {
        res.status(500).send({ message: error.message, success: false });
      }
});

// get all match

router.get("/get-all-match", async (req, res) => {
  try {
      const matches = await Match.find().populate('createdBy').populate('registeredUsers');
      res.status(200).send({ data: matches, success: true });
    } 
    catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
});

// get match by id

router.get("/:id", authMiddleware, async (req, res) => {
  try {
      const matches = await Match.findById(req.params.id).populate('createdBy').populate('registeredUsers');
      res.status(200).send({ data: matches, success: true });
    } 
    catch (error) {
      res.status(500).send({ message: error.message, success: false });
    }
});

// update match

router.put("/update-match", authMiddleware, async (req, res) => {
  try {
    await Match.findByIdAndUpdate(req.body._id, req.body);
    return res.status(200).send({
      success: true,
      message: "Матч успішно оновлено",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// delete match

router.delete("/delete-match", authMiddleware, async (req, res) => {
  try {
    await RegisterMatch.findOneAndDelete({match: req.body._id});
    await Match.findByIdAndDelete(req.body._id);
    return res.status(200).send({
      success: true,
      message: "Матч успішно видалено",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;