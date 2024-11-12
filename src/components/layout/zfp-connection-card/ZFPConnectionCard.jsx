import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';

const StyledCardWrapper = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: '100%',
  maxWidth: 800,
  minWidth: 0,
  margin: "auto",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.shape.borderRadius,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    maxWidth: '300px',
    margin: theme.spacing(1),
  },
}));

const ZFPConnectionCard = ({ children }) => {
  return (
    <StyledCardWrapper>
      {children}
    </StyledCardWrapper>
  );
};

ZFPConnectionCard.propTypes = {
  children: PropTypes.node.isRequired
};

export default ZFPConnectionCard;