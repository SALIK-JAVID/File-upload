const express = require("express");
const router = express.Router();

const { upload, uploadFile } = require("../controllers/uploadController");

// POST /upload
router.post("/", upload.single("file"), uploadFile);
//handles a single file upload 

module.exports = router;