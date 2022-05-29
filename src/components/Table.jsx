import React from 'react'

import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Codigo', width: 70 },
  { field: 'articleName', headerName: 'Nombre de articulo', width: 150 },
  { field: 'createdDate', headerName: 'Fecha de creacion', width: 150 },
  {
    field: 'available',
    headerName: 'Disponibilidad',
    width: 130,
  },
];

const rows = [
  { id: 1, articleName: 'Lamparas', createdDate: '25-05-2022 03:20 PM', available: 'Si' },
  { id: 2, articleName: 'Aceite', createdDate: '25-05-2022 03:20 PM', available: 'No' },
  { id: 3, articleName: 'Saco de arroz', createdDate: '25-05-2022 03:20 PM', available: 'No' },
  { id: 4, articleName: 'Lata de atun', createdDate: '25-05-2022 03:20 PM', available: 'Si' },
  { id: 5, articleName: 'Zapatos', createdDate: '25-05-2022 03:20 PM', available: 'No' },
  { id: 6, articleName: 'Tenis deportivos', createdDate: '25-05-2022 03:20 PM', available: 'No' },
  { id: 7, articleName: 'Vestido de lino', createdDate: '25-05-2022 03:20 PM', available: 'Si' },
  { id: 8, articleName: 'Sarten liso', createdDate: '25-05-2022 03:20 PM', available: 'No' },
  { id: 9, articleName: 'Lata de maiz', createdDate: '25-05-2022 03:20 PM', available: 'Si' },
  { id: 10, articleName: 'Lata de gandules', createdDate: '25-05-2022 03:20 PM', available: 'Si' }
];

 function Table() {
  return (
    <div style={{ height: 400, width: '100%', padding: '20px', marginLeft: 'auto', marginRight: 'auto'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
export default Table;