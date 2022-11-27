import mongoose from "mongoose";
import Watchlist from "./watchlist";

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true, trim: true },
	email: { type: String, required: true, unique: true, trim: true },
	password: { type: String, required: true },
	watchlist: { type: mongoose.Types.ObjectId, ref: "Watchlist" },
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
