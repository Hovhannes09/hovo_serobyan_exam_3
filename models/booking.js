import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Film from "./film.js";

const Booking = sequelize.init("Booking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  filmId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Film.hasMany(Booking, {
  foreignKey: "filmId",
  onDelete: "CASCADE",
});

Booking.belongsTo(Film, {
  foreignKey: "filmId",
});

export default Booking;
