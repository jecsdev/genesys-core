import React from 'react'
import Table from '../components/CustomTable'
import Menu from '../components/Menu'
import AddIcon from '@mui/icons-material/Add';
import { CardContent, Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {Card} from '@mui/material';
function Inventory() {


const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#042e50',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
    secondary: {
      main: "#4a7a9e"
      
    }
  },
});
const navigate = useNavigate();
  return (
    <div className="inventory-card">
      <ThemeProvider theme={theme}>
      <Menu/>
      <h2>Inventario</h2>
      <Card>
        <CardContent>
        <Table/>
          <div className="fab">
            <Fab color="primary" aria-label="add" onClick={()=>{
              navigate("/qrscanner")
            }} >
            <AddIcon/>
            </Fab>
          </div>
        </CardContent>
      </Card>
      </ThemeProvider>
    </div>
    

  )
}

export default Inventory