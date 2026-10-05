const { Chat } = require("../models");

exports.sendMessage = async (req, res) => {
  const chat = await Chat.create(req.body);
  res.status(201).json(chat);
};

exports.getMessages = async (req, res) => {
  const chats = await Chat.findAll({
    where: {
      senderId: req.params.userId
    }
  });
  res.json(chats);
};
