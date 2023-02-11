import school from '../assets/school.svg';
import { Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
const Home = (props) => {
  return (
    <>
      <Stack alignItems="center">
        <img src={school} height="500px" alt="school image" />
        <a href="https://storyset.com/transport">
          Transport illustrations by Storyset
        </a>
        <Button component={Link} to="students" variant="contained" size="large">
          go to students dashboard
        </Button>
      </Stack>
    </>
  );
};

export default Home;
