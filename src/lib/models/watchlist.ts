import mongoose from "mongoose";
import { Schema, SchemaDefinition } from "mongoose";
import IWatchlistSchema from "../../interfaces/IWatchlistSchema";

const watchlistDefinition: SchemaDefinition<IWatchlistSchema> = {
	list: [
		{
			adult: Schema.Types.Boolean,
			backdrop_path: String,
			genre_ids: [],
			id: Number,
			original_language: String,
			original_title: String,
			overview: String,
			popularity: Number,
			poster_path: String,
			release_date: String,
			title: String,
			video: Schema.Types.Boolean,
			vote_average: Number,
			vote_count: Number,
		},
	],
	_id: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
};

const watchlistSchema = new Schema(watchlistDefinition);

const Watchlist =
	mongoose.models.Watchlist || mongoose.model("Watchlist", watchlistSchema);

export default Watchlist;
