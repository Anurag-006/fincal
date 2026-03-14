const express = require("express");
const router  = express.Router();

// POST /api/export/excel
// Note: Excel generation happens client-side (SheetJS in browser)
// This route is a server-side fallback / future extension
router.post("/excel", (req, res) => {
  res.json({
    success: true,
    message: "Excel export handled client-side via SheetJS. This endpoint is reserved for server-side PDF generation in future.",
  });
});

module.exports = router;
