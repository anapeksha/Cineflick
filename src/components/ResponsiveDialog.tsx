import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Box,
} from "@mui/material";
import Image from "next/image";
import { getIMDB, getYTS, handleImage } from "../utils";
import { useRouter } from "next/router";
import BasicPopover from "./BasicPopover";

const ResponsiveDialog = (props: any) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [torrentData, setTorrentData] = React.useState({
		imdb_rating: "",
		torrents: [],
		genres: [],
	});
	const [findTorrent, setFindTorrent] = React.useState(false);
	const [found, setFound] = React.useState(false);
	const { query } = useRouter();

	const handleClose = () => {
		props.setOpen(false);
	};

	const fetchData = async () => {
		var imdb = await getIMDB(query.id);
		if (imdb !== undefined) {
			var torrent: any = await getYTS(imdb);
			if (torrent !== undefined && torrent.data.movie.title !== null) {
				setTorrentData({
					imdb_rating: torrent.data.movie.rating,
					torrents: torrent.data.movie.torrents,
					genres: torrent.data.movie.genres,
				});
				setFound(true);
			} else setFound(false);
		}
	};

	React.useEffect(() => {
		if (findTorrent) {
			fetchData();
			setFindTorrent(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [findTorrent]);

	const handleClick = (event: any) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
		setFindTorrent(true);
	};

	return (
		<Dialog
			fullScreen={fullScreen}
			open={props.open}
			onClose={handleClose}
			aria-labelledby="responsive-dialog-title"
		>
			<Box>
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
							props.data.backdrop_path || props.data.poster_path
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
					<DialogContentText variant="subtitle1" style={{ color: "#c9cfcf" }}>
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
					<DialogContentText variant="subtitle2" style={{ color: "#c9cfcf" }}>
						IMDb -{" "}
						<strong>
							{torrentData.imdb_rating
								? torrentData.imdb_rating + "★"
								: "Not yet available"}
						</strong>
					</DialogContentText>
					<DialogContentText
						gutterBottom
						variant="body2"
						style={{ color: "#c9cfcf", fontWeight: 400, marginBottom: "2%" }}
					>
						{torrentData.genres.map((genre, i) => {
							return genre + " ";
						})}
					</DialogContentText>
					<DialogContentText>{props.data.overview}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClick}>
						Download
					</Button>
					<BasicPopover
						anchor={anchorEl}
						setAnchor={setAnchorEl}
						data={torrentData}
						found={found}
					/>
				</DialogActions>
			</Box>
		</Dialog>
	);
};

export default ResponsiveDialog;
