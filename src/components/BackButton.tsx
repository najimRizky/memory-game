import { ArrowBackIosNew } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { ClickSound } from "../utils/Click"

type Props = {
	style?: object
	destination?: string
}

const BackButton = (props: Props) => {
	const navigate = useNavigate()

	const goToBack = () => {
		ClickSound()
		if(props.destination === undefined){
			navigate(-1)
		}else{
			navigate(props.destination)
		}
	}

	return (
		<IconButton 
			sx={props.style === undefined ? { position: "absolute", top: "10px", left: "10px" } : { ...props.style }}
			onClick={goToBack} aria-label="music" size="large">
			<ArrowBackIosNew />
		</IconButton>

	)
}

export default BackButton