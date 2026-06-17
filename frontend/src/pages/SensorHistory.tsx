import React, { useState, useEffect } from 'react';
import { DataGrid, type GridColDef, GridToolbar } from '@mui/x-data-grid';
import { motion } from 'framer-motion';

// Generate mock historical data
const generateMockHistory = () => {
  const data = [];
  const now = new Date();
  for (let i = 0; i < 100; i++) {
    const time = new Date(now.getTime() - i * 60000); // minus i minutes
    data.push({
      id: i,
      timestamp: time.toLocaleString(),
      temperature: +(20 + Math.random() * 10).toFixed(1),
      humidity: +(50 + Math.random() * 20).toFixed(1),
      ethylene: +(0.1 + Math.random() * 2).toFixed(2),
      status: Math.random() > 0.9 ? 'Warning' : 'Optimal'
    });
  }
  return data;
};

const columns: GridColDef[] = [
  { field: 'timestamp', headerName: 'Timestamp', width: 200 },
  { field: 'temperature', headerName: 'Temp (°C)', width: 130, type: 'number' },
  { field: 'humidity', headerName: 'Humidity (%)', width: 130, type: 'number' },
  { field: 'ethylene', headerName: 'Ethylene (ppm)', width: 150, type: 'number' },
  { 
    field: 'status', 
    headerName: 'Status', 
    width: 130,
    renderCell: (params) => (
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
        params.value === 'Optimal' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
      }`}>
        {params.value}
      </span>
    )
  },
];

export const SensorHistory: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    setRows(generateMockHistory());
  }, []);

  return (
    <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
      <div>
        <h2 className="text-2xl font-bold">Sensor History</h2>
        <p className="text-gray-500">Historical logs of all storage conditions</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-4 rounded-2xl flex-1 overflow-hidden flex flex-col"
      >
        <div className="bg-white dark:bg-slate-900 h-full rounded-xl overflow-hidden shadow-inner">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 25 },
              },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            disableRowSelectionOnClick
            className="dark:text-white dark:border-gray-700"
            sx={{
              border: 'none',
              '& .MuiDataGrid-cell': {
                borderColor: 'var(--glass-border-dark)',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'rgba(243, 244, 246, 0.5)',
                borderBottom: '1px solid var(--glass-border-dark)',
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: '1px solid var(--glass-border-dark)',
              },
              '& .MuiToolbar-root': {
                color: 'inherit',
              },
              '& .MuiButton-root': {
                color: '#3b82f6',
              }
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};
