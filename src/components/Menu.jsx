import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import ListItemAvatar  from '@mui/material/ListItemAvatar';
import GroupIcon from '@mui/icons-material/Group';
import HouseIcon from '@mui/icons-material/House';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet, useNavigate} from 'react-router-dom'


 function Menu(props) {
  const drawerWidth = 240;
  
  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );


  
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'right',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));
    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
  
    return (
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{background: '#3f51b5'}}>
            <Toolbar>
              <IconButton 
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'flex'}) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Genesys Core
                </Typography>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1}}>
                
              </Typography>
              <div>
                <Typography variant="h6">
                Bienvenido, John
                </Typography>
              </div>
            </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
          <ListItem button onClick={()=> {
            navigate("/Home")
          }} >
                <ListItemAvatar>
                    <HouseIcon/>
                </ListItemAvatar>
                <ListItemText primary="Inicio"/>
          </ListItem>
              <ListItem button onClick={()=> {
                navigate("/inventory")
              }}>
                <ListItemAvatar>
                    <WarehouseIcon/>
                </ListItemAvatar>
                <ListItemText primary="Inventario"/>
            </ListItem>
          </List>
          <Divider />
          <List>
              <ListItem button >
                <ListItemAvatar>
                    <GroupIcon/>
                </ListItemAvatar>
                <ListItemText primary="Usuarios"/>
              </ListItem>
              <ListItem button >
                <ListItemAvatar>
                    <SettingsIcon/>
                </ListItemAvatar>
                <ListItemText primary="Configuracion"/>
              </ListItem>
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
      </Main>
      <Outlet/>
    </Box>
    );
    
}
export default Menu;