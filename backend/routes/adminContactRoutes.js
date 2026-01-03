const express = require("express");
const router = express.Router();

const {
  getAllContacts,
  markRead,
  deleteContact,
} = require("../controllers/contactController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get(
  "/contacts",
  authMiddleware,
  adminMiddleware,
  getAllContacts
);

router.put(
  "/contacts/read/:id",
  authMiddleware,
  adminMiddleware,
  markRead
);

router.delete(
  "/contacts/:id",
  authMiddleware,
  adminMiddleware,
  deleteContact
);

module.exports = router;
