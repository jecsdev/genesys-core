import React from 'react'
import Table from '../components/CustomTable'
import Menu from '../components/Menu'
import AddIcon from '@mui/icons-material/Add';
import { CardContent } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {Card} from '@mui/material';
import FabMenu from '../components/FabMenu';
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
  return (
    <div className="inventory-card">
      <ThemeProvider theme={theme}>
      <Menu/>
      <h2>Inventario</h2>
      <Card>
        <CardContent>
        <Table/>
          <div className="fab">
            <FabMenu color="primary" aria-label="add" >
            <AddIcon/>
            </FabMenu>
          </div>
        </CardContent>
      </Card>
      </ThemeProvider>
    </div>
    

  )
}

export default Inventory