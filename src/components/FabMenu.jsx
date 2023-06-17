import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { QrCodeScanner } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import {
  FloatingMenu,
  MainButton,
  ChildButton,
} from 'react-floating-button-menu';
import { useNavigate} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  fabAdd: {
    backgroundColor: '#748ca4'
  },
  fabButton: {

    backgroundColor: '#042e50',
  },
  fabQrScanner: {
    backgroundColor: '#ac2c8c',
  }
}));

const FabMenu = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleFabClick = () => {
    setIsOpen(!isOpen);
  };



  return (
    <FloatingMenu
      slideSpeed={200}
      direction="up"
      spacing={8}
      isOpen={isOpen}
    >
      <MainButton
        className={classes.fabButton}
        iconResting={<AddIcon style={{ fontSize: 20, color:'#FFFFFF' }} />}
        iconActive={<CloseIcon style={{ fontSize: 20, color:'#FFFFFF' }}  />}
    
        onClick={handleFabClick}
        size={56}
      />
      <ChildButton
        className={classes.fabAdd}
        icon={<EditIcon style={{ fontSize: 20, color:'#FFFFFF' }} />}
        onClick={()=>{navigate("/addProduct")}}
        size={40}
      />
      <ChildButton
        className={classes.fabQrScanner}
        icon={<QrCodeScanner style={{ fontSize: 20, color:'#FFFFFF' }} />}
        size={40}
      />
      
    </FloatingMenu>
  );
};

export default FabMenu;
