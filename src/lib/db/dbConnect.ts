import mongoose from "mongoose";
import { MONGODB_URI } from "../../uri";

if (!MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env"
	);
}

const dbName = process.env.NODE_ENV === "production" ? "prod" : "dev";

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
			dbName: dbName,
		};
		mongoose.set({ strictQuery: false });
		cached.promise = mongoose
			.connect(MONGODB_URI as string, opts)
			.then((mongoose) => {
				console.log("DB Connected");
				return mongoose;
			});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}

export default dbConnect;
