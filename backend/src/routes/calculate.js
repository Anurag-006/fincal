const express = require("express");
const router  = express.Router();
const { calculateRetirement } = require("../controllers/retirementController");
const { calculateSip, calculateLumpsum } = require("../controllers/sipController");
const { validateRetirementInput } = require("../utils/validators");

// POST /api/calculate/retirement
router.post("/retirement", (req, res) => {
  const errors = validateRetirementInput(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  calculateRetirement(req, res);
});

// POST /api/calculate/sip
router.post("/sip", calculateSip);

// POST /api/calculate/lumpsum
router.post("/lumpsum", calculateLumpsum);

module.exports = router;
