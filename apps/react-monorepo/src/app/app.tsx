import { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { FieldType, Field, FieldGenerator } from './field-generator';
import FieldDrawer from './FieldDrawer';

export function App() {
  const [fields, setFields] = useState<Field[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  useEffect(() => {
    // Generate random fields
    const generatedFields = FieldGenerator.generateRandomFields(20);
    setFields(generatedFields);

    // Generate sample data for the fields that are displayed on the grid
    const gridFields = generatedFields.filter(field => field.displayOnGrid);
    const sampleData = Array.from({ length: 5 }, (_, index) => {
      const row: any = { id: index + 1 };
      gridFields.forEach(field => {
        row[field.name] = generateSampleData(field.type);
      });
      return row;
    });

    setRows(sampleData);
  }, []);

  const generateSampleData = (type: FieldType): any => {
    switch (type) {
      case 'text':
        return 'Sample Text';
      case 'number':
        return Math.floor(Math.random() * 100);
      case 'date':
        return new Date().toLocaleDateString();
      case 'boolean':
        return Math.random() > 0.5;
      default:
        return '';
    }
  };

  // Create columns for the DataGrid
  const columns: GridColDef[] = fields
    .filter(field => field.displayOnGrid)
    .map(field => ({
      field: field.name,
      headerName: field.displayName,
      width: 150,
      description: field.toolTip,
      type: field.type === 'number' ? 'number' : 'string'
    }));

  const handleRowDoubleClick = (params: GridRowParams) => {
    setSelectedRow(params.row);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} onRowDoubleClick={handleRowDoubleClick} />
      <FieldDrawer open={drawerOpen} onClose={handleCloseDrawer} fields={fields} selectedRow={selectedRow} />
    </div>
  );
}

export default App;
