import models from "./models/index.js";
import routes from "./routes/index.js";
import services from "./services/index.js";
import database from "./configs/databases.js";

export const id = "precasting";
export const name = "BJ Precast - Precasting and Metal Devide";
export const slug = "pr";
export const information = {
  title: "ตัดเหล็กและงานพรีคาสติ้ง",
  description: "ระบบบาร์คัดเหล็ก และบันทึกการตัดเหล็ก ของ BJ Precast",
};
export const version = "0.1.0";
export const moduleLevel = true;

const initialize = (mongoUri) => {
  database.initialize(mongoUri);
};

export { services, models, routes, initialize };
export default {
  id,
  name,
  slug,
  version,
  services,
  information,
  models,
  routes,
  moduleLevel,
};
