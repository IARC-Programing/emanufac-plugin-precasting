import express from "express";

import precaseProject from "./precaseProject.routes";

console.log("On Precasting Plugin Route");
const router = express.Router();

router.use("/precast-project", precaseProject);

export default router;
