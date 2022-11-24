import mongoose from "mongoose";
import { MONGODB_URI } from "../uri";

if (!MONGODB_URI) {
	throw new Error("Please define the MONGODB_URI environment variable");
}

var cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const options = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};

		cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
			console.log("connected");
			return mongoose;
		});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}

export default dbConnect;
