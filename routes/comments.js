const express = require("express");
const router = express.Router();
const { Comment, validateComment } = require("../models/comment");
const { Reply, validateReply } = require("../models/reply");

//  COMMENT ENDPOINTS
// ! GET ALL COMMENTS (10 min)
// http://localhost:3007/api/comments
router.get("/", async (req, res) => {
  try {
    let comments = await Comment.find();
    if (!comments)
      return res.status(400).send(`No xomments in this collection!`);
    return res.status(200).send(comments);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// ! GET A COMMENT BY ID (10 min)
// ! POST NEW COMMENT TO COMMENTS (20-30 min) (COMPLETED )
router.post("/", async (req, res) => {
  try {
    const { error } = validateComment;
    if (error) return res.status(400).send(error);
    let newComment = await new Comment(req.body);
    await newComment.save();
    return res.status(201).send(newComment);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
// ! UPDATE AN EXISTING LIKES / DISLIKES FOR COMMENT BY ID (20-30 min)

// ! DELETE A COMMENT BY ID (10 min)

// REPLIES ENDPOINTS
// ! POST NEW REPLY TO COMMENT BY COMMENT ID (30-40 min)

module.exports = router;
