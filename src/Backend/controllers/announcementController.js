const { Announcement } = require("../models");

exports.postAnnouncement = async (req, res) => {
  const announcement = await Announcement.create(req.body);
  res.status(201).json(announcement);
};

exports.getAnnouncements = async (req, res) => {
  const announcements = await Announcement.findAll({
    order: [["date", "DESC"]]
  });
  res.json(announcements);
};
