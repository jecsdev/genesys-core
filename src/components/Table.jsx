import React from 'react'

import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Numero', width: 70 },
  { field: 'articleName', headerName: 'Nombre de articulo', width: 150 },
  { field: 'createdDate', headerName: 'Fecha de creacion', width: 150 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.articleName || ''} ${params.row.createdDate || ''}`,
  },
];

const rows = [
  { id: 1, articleName: 'Lamparas', createdDate: '25-05-2022 03:20 PM', age: 35 },
  { id: 2, articleName: 'Aceite', createdDate: '25-05-2022 03:20 PM', age: 42 },
  { id: 3, articleName: 'Saco de arroz', createdDate: '25-05-2022 03:20 PM', age: 45 },
  { id: 4, articleName: 'Lata de atun', createdDate: '25-05-2022 03:20 PM', age: 16 },
  { id: 5, articleName: 'Zapatos', createdDate: '25-05-2022 03:20 PM', age: null },
  { id: 6, articleName: 'Tenis deportivos', createdDate: '25-05-2022 03:20 PM', age: 150 },
  { id: 7, articleName: 'Vestido de lino', createdDate: '25-05-2022 03:20 PM', age: 44 },
  { id: 8, articleName: 'Sarten liso', createdDate: '25-05-2022 03:20 PM', age: 36 },
  { id: 9, articleName: 'Lata de maiz', createdDate: '25-05-2022 03:20 PM', age: 65 },
];

export default function Table() {
  return (
    <div style={{ height: 400, width: '100%', padding: '20px', marginLeft: 'auto', marginRight: 'auto'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}