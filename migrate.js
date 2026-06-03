import sequelize from "./clients/db.sequelize.js";

import "./models/booking.js";
import "./models/comment.js";
import "./models/film.js";
import "./models/showtime.js";
import "./models/user.js";

export async function migrate() {
  try {
    await sequelize.sync({ force: true });
    console.log("Database migrated successfully.");
  } catch (error) {
    console.error("Error migrating database:", error);
  } finally {
    await sequelize.close();
  }
}
