import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Film = sequelize.define("Film", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Film.hasMany(Comment, { foreignKey: "filmId", onDelete: "CASCADE" });
Comment.belongsTo(Film, { foreignKey: "filmId" });

export default Comment;
