import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'Codigo', width: 'auto' },
  { field: 'articleName', headerName: 'Nombre de articulo', width: 'auto'  },
  { field: 'description', headerName: 'Descripción', width: 'auto' },
  { field: 'createdDate', headerName: 'Fecha de creación', width: 'auto'  },
  { field: 'price', headerName: 'Precio', width: 'auto' },
  { field: 'available', headerName: 'Disponibilidad', width: 'auto'  }
];

const rows = [
  { id: 1, articleName: 'Lamparas',description: 'Descripcion del articulo', createdDate: '25-05-2022 03:20 PM',  price: 200, available: 'Si'},
  { id: 2, articleName: 'Aceite',description: 'Descripcion del articulo', createdDate: '25-05-2022 03:20 PM',  price: 500, available: 'No'},
  { id: 3, articleName: 'Saco de arroz',description: 'Descripcion del articulo', createdDate: '25-05-2022 03:20 PM',  price: 300, available: 'No'},
  { id: 4, articleName: 'Lata de atun',description: 'Descripcion del articulo', createdDate: '25-05-2022 03:20 PM',  price: 110, available: 'Si'},
  { id: 5, articleName: 'Zapatos',description: 'Descripcion del articulo', createdDate: '25-05-2022 03:20 PM',  price: 2000, available: 'No'},
  { id: 6, articleName: 'Tenis deportivos',description: 'Descripcion del articulo', createdDate: '25-05-2022 03:20 PM',  price: 600, available: 'No'},
  { id: 7, articleName: 'Vestido de lino',description: 'Descripcion del articulo', createdDate: '25-05-2022 03:20 PM',  price: 1200, available: 'Si'},
  { id: 8, articleName: 'Sarten liso',description: 'Descripcion del articulo', createdDate: '25-05-2022 03:20 PM',  price: 800, available: 'No'},
  { id: 9, articleName: 'Lata de maiz',description: 'Descripcion del articulo', createdDate: '25-05-2022 03:20 PM',  price: 450, available: 'Si'},
  { id: 10, articleName: 'Lata de gandules',description: 'Descripcion del articulo', createdDate: '25-05-2022 03:20 PM',  price: 80, available: 'Si'}
];


function CustomTable () {
  return (
      <Table className="table">
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
  );
};

export default CustomTable;
