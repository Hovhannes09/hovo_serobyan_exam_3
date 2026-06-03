import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Film = sequelize.init("Film", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  duration: {
    type: DataTypes.INTEGER,
  },
});

export default Film;
