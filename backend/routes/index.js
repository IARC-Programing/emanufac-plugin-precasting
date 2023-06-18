import express from "express";

import metalDivide from "./metalDivide.js";

const router = express.Router();

router.use("/metal-divide", metalDivide);

export default router;
