import IWatchlist from "./IWatchlist";
import React from "react";

interface IDialog {
	data: IWatchlist;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default IDialog;
