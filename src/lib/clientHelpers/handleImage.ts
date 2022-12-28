const handleImage: any = (image: string, quality: string) => {
	if (image !== null) {
		return `https://image.tmdb.org/t/p/w${quality}${image}`;
	} else return "/not-found.jpg";
};

export default handleImage;
