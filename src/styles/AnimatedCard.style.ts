import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

const AnimatedCard = styled(Card)({
	transition: "transform .2s",
	"&:hover": {
		transform: "scale(1.05)",
	},
});

export default AnimatedCard;
