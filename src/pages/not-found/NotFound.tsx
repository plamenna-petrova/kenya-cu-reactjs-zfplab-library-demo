import { FC } from "react";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center"
}));

const NotFoundRoot = styled(FlexBox)(() => ({
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh"
}));

const JustifyBox = styled(FlexBox)(() => ({
  maxWidth: 600,
  maxHeight: 300,
  flexDirection: "column",
  justifyContent: "center",
  padding: "20px"
}));

const IMG = styled("img")({
  width: "100%",
  marginBottom: "32px"
});

const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <NotFoundRoot>
      <JustifyBox>
        <IMG src="/assets/images/tremol-banner.png" alt="Tremol Banner" />
        <Typography sx={{ text: 'center' }} variant="h5">The requested page was not found</Typography>
        <Button
          color="primary"
          variant="contained"
          size="large"
          sx={{ textTransform: "capitalize", mt: 5 }}
          onClick={() => navigate(-1)}>
          BACK TO THE DEMO
        </Button>
      </JustifyBox>
    </NotFoundRoot>
  );
};

export default NotFound;