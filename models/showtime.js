import { DataTypes } from "sequelize";
import sequelize from "../clients/db.sequelize.js";

const Showtime = sequelize.init("Showtime", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  theaterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default Showtime;
