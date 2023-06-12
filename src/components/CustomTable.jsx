import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'Codigo', width: 'auto' },
  { field: 'articleName', headerName: 'Nombre de articulo', width: 'auto'  },
  { field: 'createdDate', headerName: 'Fecha de creación', width: 'auto'  },
  { field: 'available', headerName: 'Disponibilidad', width: 'auto'  },
  { field: 'price', headerName: 'Precio', width: 'auto' }
];

const rows = [
  { id: 1, articleName: 'Lamparas', createdDate: '25-05-2022 03:20 PM', available: 'Si', price: 200 },
  { id: 2, articleName: 'Aceite', createdDate: '25-05-2022 03:20 PM', available: 'No', price: 500 },
  { id: 3, articleName: 'Saco de arroz', createdDate: '25-05-2022 03:20 PM', available: 'No', price: 300 },
  { id: 4, articleName: 'Lata de atun', createdDate: '25-05-2022 03:20 PM', available: 'Si', price: 110 },
  { id: 5, articleName: 'Zapatos', createdDate: '25-05-2022 03:20 PM', available: 'No', price: 2000 },
  { id: 6, articleName: 'Tenis deportivos', createdDate: '25-05-2022 03:20 PM', available: 'No', price: 600 },
  { id: 7, articleName: 'Vestido de lino', createdDate: '25-05-2022 03:20 PM', available: 'Si', price: 1200 },
  { id: 8, articleName: 'Sarten liso', createdDate: '25-05-2022 03:20 PM', available: 'No', price: 800 },
  { id: 9, articleName: 'Lata de maiz', createdDate: '25-05-2022 03:20 PM', available: 'Si', price: 450 },
  { id: 10, articleName: 'Lata de gandules', createdDate: '25-05-2022 03:20 PM', available: 'Si', price: 80 },
];


function CustomTable () {
  return (
    <div className="table">
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field} style={{ width: column.width }}>
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.field}>{row[column.field]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  
  );
};

export default CustomTable;
