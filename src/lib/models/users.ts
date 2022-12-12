import mongoose from "mongoose";
import Watchlist from "./watchlist";

const userSchema = new mongoose.Schema({
	photo: { type: String, trim: true },
	username: { type: String, required: true, unique: true, trim: true },
	email: { type: String, required: true, unique: true, trim: true },
	password: { type: String, required: true },
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
