import { Box, Button, Typography } from '@mui/material';
import { useNavigate, useRouteError } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  return (
    <Box
      sx={{
        maxWidth: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h1" color="error">
        {error.code}
      </Typography>
      <Typography variant="h2" color="error">
        {error?.data}
      </Typography>
      <Typography variant="body2">{error.message}</Typography>
      <Button onClick={() => navigate(-1)}>go back</Button>
    </Box>
  );
};

export default NotFound;
