import models from "./models/index.js";
import routes from "./routes/index.js";
import services from "./services/index.js";
import database from "./configs/databases.js";

export const id = "bj-metal-divide";
export const name = "Benjaporn Concrete Metal Divider";
export const slug = "bj";
export const version = "0.1.0";

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
  models,
  routes,
};
