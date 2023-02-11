import Navbar from '../components/navbar';
import { Outlet } from 'react-router-dom';
import { Box, Container, GlobalStyles, LinearProgress } from '@mui/material';
import { useNavigation } from 'react-router-dom';

const Layout = () => {
  const navigation = useNavigation();
  return (
    <>
      <GlobalStyles styles={{ body: { backgroundColor: '#f0f0f0' } }} />
      <Navbar />
      {navigation.state === 'loading' ? (
        <LinearProgress sx={{ height: 8 }} />
      ) : (
        <Box sx={{ height: 8 }} />
      )}
      <Container sx={{ pt: 2 }} maxWidth="xl">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
