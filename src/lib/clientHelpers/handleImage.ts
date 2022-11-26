const handleImage: any = (image: string) => {
	if (image !== null) {
		return `https://image.tmdb.org/t/p/w500${image}`;
	} else return "/not-found.jpg";
};

export default handleImage;
