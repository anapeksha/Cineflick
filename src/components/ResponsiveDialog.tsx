import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import {
	AlertColor,
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import IDialog from "../interfaces/IDialog";
import IWatchlist from "../interfaces/IWatchlist";
import getIMDB from "../lib/clientHelpers/getIMDB";
import getYTS from "../lib/clientHelpers/getYTS";
import handleImage from "../lib/clientHelpers/handleImage";
import { useAuthenticationContext } from "../lib/context/authenticatedContext";
import { useLoadingContext } from "../lib/context/loadingContext";
import BasicPopover from "./BasicPopover";
import Carousel from "./Carousel";
import CustomAlert from "./CustomAlert";
import Loader from "./Loader";

var alert: AlertColor = "error";

const ResponsiveDialog: React.FC<IDialog> = (props) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
	const [anchorEl, setAnchorEl] = useState(null);
	const { isAuthenticated } = useAuthenticationContext();
	const { isLoading, setIsLoading } = useLoadingContext();
	const [watchlist, setWatchlist] = useState<Array<IWatchlist>>([]);
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [variant, setVariant] = useState<AlertColor | undefined>();
	const [torrentData, setTorrentData] = useState<any>({
		imdb_rating: "",
		torrents: [],
		genres: [],
	});
	const [findTorrent, setFindTorrent] = useState(false);
	const [found, setFound] = useState(false);

	const handleClose = () => {
		props.setOpen(false);
	};

	const findInWatchlist = () => {
		let flag = false;
		for (let i = 0; i < watchlist.length; ++i) {
			if (watchlist[i].id === props.data.id) {
				flag = true;
				break;
			}
		}
		return flag;
	};

	const fetchData = async () => {
		if (props.data.id !== undefined) {
			var imdb = await getIMDB(props.data.id);
			if (imdb !== undefined) {
				try {
					var torrent: any = await getYTS(imdb);
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
				} catch (error) {
					console.log(error);
				}
			}
		}
	};

	const handleSetWatchlist = async () => {
		setIsLoading(true);
		localStorage.removeItem("watchlist");
		localStorage.setItem(
			"watchlist",
			JSON.stringify([...watchlist, props.data])
		);
		try {
			const response = await axios.post("/api/watchlist/setWatchlist", {
				list: [...watchlist, props.data],
			});
			if (response.status === 200) {
				alert = "success";
				setOpen(true);
				setMessage("Added to watchlist...");
				setWatchlist([...watchlist, props.data]);
				setVariant(alert);
				setIsLoading(false);
			}
		} catch (error) {
			if (error instanceof AxiosError || axios.isAxiosError(error)) {
				alert = "error";
				setOpen(true);
				setMessage(error!.response!.data!.error);
				setVariant(alert);
				setIsLoading(false);
			} else {
				setOpen(true);
				setMessage("Something went wrong");
				setVariant(alert);
				setIsLoading(false);
			}
		}
	};

	const handleRemoveWatchlist = async () => {
		setIsLoading(true);
		localStorage.removeItem("watchlist");
		var tempWatchlist = watchlist;
		for (let i = 0; i < tempWatchlist.length; ++i) {
			if (tempWatchlist[i].id === props.data.id) {
				tempWatchlist.splice(i, 1);
				break;
			}
		}
		localStorage.setItem("watchlist", JSON.stringify(tempWatchlist));
		try {
			const response = await axios.post("/api/watchlist/setWatchlist", {
				list: tempWatchlist,
			});
			if (response.status === 200) {
				alert = "success";
				setOpen(true);
				setMessage("Removed from watchlist...");
				setWatchlist(tempWatchlist);
				setVariant(alert);
				setIsLoading(false);
			}
		} catch (error) {
			if (error instanceof AxiosError || axios.isAxiosError(error)) {
				alert = "error";
				setOpen(true);
				setMessage(error!.response!.data!.error);
				setVariant(alert);
				setIsLoading(false);
			} else {
				setOpen(true);
				setMessage("Something went wrong");
				setVariant(alert);
				setIsLoading(false);
			}
		}
	};

	const handleWatchlistIcon = () => {
		let flag = findInWatchlist();
		if (flag) {
			return (
				<Tooltip title="Remove from Watchlist" color="inherit">
					<IconButton color="inherit" onClick={handleRemoveWatchlist}>
						<FavoriteIcon style={{ color: "red" }} />
					</IconButton>
				</Tooltip>
			);
		} else {
			return (
				<Tooltip title="Add to Watchlist" color="inherit">
					<IconButton color="inherit" onClick={handleSetWatchlist}>
						<FavoriteBorderRoundedIcon />
					</IconButton>
				</Tooltip>
			);
		}
	};

	useEffect(() => {
		fetchData();
		var tempWatchlist = localStorage.getItem("watchlist");
		if (tempWatchlist) {
			setWatchlist(JSON.parse(tempWatchlist));
		} else {
			setWatchlist([]);
		}
	}, [props.open]);

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
					src={handleImage(
						props.data.backdrop_path || props.data.poster_path,
						"500"
					)}
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
						{(props.data.release_date || "-----").substring(0, 4)} [
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
				<Carousel id={String(props.data.id)} />
			</DialogContent>
			<DialogActions>
				{isAuthenticated ? handleWatchlistIcon() : null}
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
			<CustomAlert
				open={open}
				setOpen={setOpen}
				message={message}
				variant={variant}
			/>
			<Loader />
		</Dialog>
	);
};

export default ResponsiveDialog;
