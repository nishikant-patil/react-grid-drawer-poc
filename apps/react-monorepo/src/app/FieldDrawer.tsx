import React, { useState } from 'react';
import { Drawer, Paper, Card, CardContent, Typography, Grid, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Field } from './Field';

interface FieldDrawerProps {
  open: boolean;
  onClose: () => void;
  fields: Field[];
  selectedRow: any;
}

const FieldDrawer: React.FC<FieldDrawerProps> = ({ open, onClose, fields, selectedRow }) => {
  const [formData, setFormData] = useState<any>(selectedRow || {});

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = () => {
    // Add validation logic here if needed
    console.log(JSON.stringify(formData, null, 2));
  };

  const groupedFields = fields.reduce((acc, field) => {
    if (!acc[field.container]) {
      acc[field.container] = [];
    }
    acc[field.container].push(field);
    return acc;
  }, {} as Record<string, Field[]>);

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ style: { width: '50%' } }}>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <IconButton onClick={onClose} style={{ alignSelf: 'flex-end' }}>
          <CloseIcon />
        </IconButton>
        <Grid container spacing={2} wrap="wrap">
          {Object.keys(groupedFields).map(container => (
            <Grid item xs={12} sm={6} key={container}>
              <Paper style={{ padding: 10 }}>
                <Typography variant="h6">{container}</Typography>
                <Grid container spacing={2}>
                  {groupedFields[container].map(field => (
                    <Grid item xs={12} sm={6} key={field.name}>
                      <TextField
                        label={field.displayName}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        fullWidth
                        type={field.type === 'number' ? 'number' : 'text'}
                        variant="outlined"
                        margin="normal"
                      />
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <div style={{ marginTop: 'auto', padding: 10 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
            Submit
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default FieldDrawer;
