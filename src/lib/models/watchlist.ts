import mongoose from "mongoose";
import { Schema, SchemaDefinition } from "mongoose";
import IWatchlist from "../../interfaces/IWatchlist";

const watchlistDefinition: SchemaDefinition<IWatchlist> = {
	watchlist: [
		{
			adult: Schema.Types.Boolean,
			backdrop_path: String,
			genre_ids: [Number],
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
};

const watchlistSchema = new Schema(watchlistDefinition);

const Watchlist =
	mongoose.models.Watchlist || mongoose.model("Watchlist", watchlistSchema);

export default Watchlist;
