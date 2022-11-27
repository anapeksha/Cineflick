import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Box,
	Divider,
	Tooltip,
} from "@mui/material";
import Image from "next/image";
import getIMDB from "../lib/clientHelpers/getIMDB";
import getYTS from "../lib/clientHelpers/getYTS";
import handleImage from "../lib/clientHelpers/handleImage";
import { useRouter } from "next/router";
import BasicPopover from "./BasicPopover";
import Carousel from "./Carousel";
import isAuthenticated from "../lib/auth/isAuthenticated";

const ResponsiveDialog = (props: any) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [torrentData, setTorrentData] = React.useState<any>({
		imdb_rating: "",
		torrents: [],
		genres: [],
	});
	const [findTorrent, setFindTorrent] = React.useState(false);
	const [found, setFound] = React.useState(false);
	const [authenticated, setAuthenticated] = React.useState<Promise<boolean>>();
	const { query } = useRouter();

	const handleClose = () => {
		props.setOpen(false);
	};

	const fetchData = async () => {
		if (query.id !== undefined) {
			var imdb = await getIMDB(query.id);
			if (imdb !== undefined) {
				var torrent: any = await getYTS(imdb);
				console.log(torrent);
				if (torrent !== undefined && torrent.data.movie.title !== null) {
					setTorrentData({
						imdb_rating: torrent.data.movie.rating,
						torrents: torrent.data.movie.torrents,
						genres: torrent.data.movie.genres,
					});
					setFound(true);
				} else {
					setTorrentData(null);
					setFound(false);
				}
			}
		}
	};

	React.useEffect(() => {
		fetchData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.open]);

	React.useEffect(() => {
		setAuthenticated(isAuthenticated());
	}, []);

	const handleClick = (event: any) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	return (
		<Dialog
			fullScreen={fullScreen}
			open={props.open}
			onClose={handleClose}
			aria-labelledby="responsive-dialog-title"
		>
			<DialogActions style={{ display: "flex", justifyContent: "start" }}>
				<IconButton onClick={handleClose}>
					<CloseRoundedIcon fontSize="small" />
				</IconButton>
			</DialogActions>
			<Box
				style={{
					position: "relative",
					width: "100%",
					paddingBottom: "50%",
				}}
			>
				<Image
					src={handleImage(props.data.backdrop_path || props.data.poster_path)}
					alt={props.data.title}
					fill
					style={{ objectFit: "cover" }}
				/>
			</Box>
			<DialogTitle id="responsive-dialog-title" display="flex">
				{props.data.title || props.data.original_title}
			</DialogTitle>
			<DialogContent>
				<DialogContentText variant="subtitle1">
					<strong>
						{(
							props.data.first_air_date ||
							props.data.release_date ||
							"-----"
						).substring(0, 4)}{" "}
						[
						{props.data.original_language &&
							props.data.original_language.toUpperCase()}
						]
					</strong>
				</DialogContentText>
				<DialogContentText variant="subtitle2">
					IMDb -{" "}
					<strong>
						{torrentData !== null
							? torrentData.imdb_rating + "★"
							: "Not yet available"}
					</strong>
				</DialogContentText>
				<DialogContentText
					gutterBottom
					variant="body2"
					style={{ fontWeight: 400, marginBottom: "2%" }}
				>
					{torrentData !== null &&
						torrentData.genres.map((genre: any, i: number) => {
							if (i !== torrentData.genres.length - 1) {
								return genre + " ● ";
							} else {
								return genre;
							}
						})}
				</DialogContentText>
				<DialogContentText sx={{ mb: "20px" }}>
					{props.data.overview}
				</DialogContentText>
				<DialogContentText variant="subtitle1" fontWeight="bold">
					Cast
				</DialogContentText>
				<Carousel id={String(query.id)} />
			</DialogContent>
			<DialogActions>
				{authenticated ? (
					<Tooltip title="Add to Watchlist" color="inherit">
						<IconButton color="inherit">
							<FavoriteBorderRoundedIcon style={{ color: "red" }} />
						</IconButton>
					</Tooltip>
				) : null}
				<Tooltip title="Download">
					<IconButton onClick={handleClick} color="inherit">
						<DownloadRoundedIcon />
					</IconButton>
				</Tooltip>
				<BasicPopover
					anchor={anchorEl}
					setAnchor={setAnchorEl}
					data={torrentData}
					found={found}
				/>
			</DialogActions>
		</Dialog>
	);
};

export default ResponsiveDialog;
