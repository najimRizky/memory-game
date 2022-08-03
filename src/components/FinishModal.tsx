import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
// import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
    totalFlip: number,
    retryGame: any,
    handleOpen: any,
    handleClose: any,
    openModalFinish: boolean
}

const style: object = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid rgba(0,0,0,0.5)',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px"
};

const FinishModal = (props: Props) => {

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.openModalFinish}
                // onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.openModalFinish}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" sx={{textAlign: "center", fontWeight: "normal"}} variant="h6" component="h3">
                            Congratulations! You finish this game with <b>{props.totalFlip}</b> total flip
                        </Typography>
                        <Box sx={{textAlign: "center", mt: "20px"}}>
                            <Button onClick={props.retryGame} variant="contained" sx={{mr: "10px"}} color="success" >Retry</Button>
                            <Link to={"/play"} style={{textDecoration: "none"}}>
                                <Button variant="contained" color="secondary" >Change Mode</Button>
                            </Link>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default FinishModal