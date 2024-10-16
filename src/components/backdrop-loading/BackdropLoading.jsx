import { useState } from "react";
import { styled } from "@mui/material/styles";
import { H3 } from "../typography-elements/TypographyElements";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.grey[800],
        }),
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#203760',
        ...theme.applyStyles('dark', {
            backgroundColor: '#308fe8',
        }),
    },
}));

const BackdropLoading = ({ loadingMessage }) => {
    const [isBackdropLoadingOpen, setIsBackdropLoadingOpen] = useState(false);

    const handelBackdropLoadingOpen = () => {
        setIsBackdropLoadingOpen(true);
    }

    const handleBackdropLoadingClose = () => {
        setIsBackdropLoadingOpen(false);
    }

    return (
        <div>
            <Button onClick={handelBackdropLoadingOpen}>Show backdrop</Button>
            <Backdrop
                sx={{
                    color: '#000',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: 'rgba(245, 245, 245, 0.7)'
                }}
                open={isBackdropLoadingOpen}
                onClick={handleBackdropLoadingClose}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '18rem', md: '30rem' } }}>
                    <H3 sx={{ textAlign: 'center' }}>{loadingMessage}</H3>
                    <BorderLinearProgress value={50} sx={{ mt: 2 }} />
                </Box>
            </Backdrop>
        </div>
    )
}

export default BackdropLoading;