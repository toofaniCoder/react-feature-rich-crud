import { AppBar, Toolbar, Typography, MenuItem, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';

const activeStyle = {
  backgroundColor: '#fff',
  color: '#333',
  borderRadius: 5,
};

const Navbar = (props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          component={NavLink}
          to="/"
          sx={{ textDecoration: 'none', color: 'grey.50' }}
        >
          Student CRUD 2.0
        </Typography>
        <Stack spacing={2} sx={{ marginLeft: 'auto' }} direction="row">
          <MenuItem
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            component={NavLink}
            to="/"
          >
            Home
          </MenuItem>
          <MenuItem
            component={NavLink}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="about"
          >
            About
          </MenuItem>
          <MenuItem
            component={NavLink}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="contact"
          >
            Contact
          </MenuItem>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
