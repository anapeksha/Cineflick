const handleImage: any = (image: string) => {
	if (image !== null) {
		return `https://image.tmdb.org/t/p/w500${image}`;
	} else return "https://www.movienewz.com/img/films/poster-holder.jpg";
};

export default handleImage;
