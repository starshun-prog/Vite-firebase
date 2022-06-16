import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const MenuBar = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='secondary'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center" }}>
            お問い合わせ一覧
          </Typography>
          {auth && (
            <div>
            <Button
              variant='contained'
              sx={{
                margin: "20px",
                zIndex: "100",
                position: "relative"
              }}
              onClick={async () => await signOut(auth)}
            >
              logout
            </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default MenuBar;