
import { DataRow } from '@/contexts/DashboardContext';

export const parseCSV = (csvText: string): DataRow[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) {
    throw new Error('CSV must have at least a header row and one data row');
  }

  const headers = lines[0].split(',').map(h => h.trim());
  const data: DataRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    
    if (values.length !== headers.length) {
      console.warn(`Row ${i} has ${values.length} columns, expected ${headers.length}. Skipping.`);
      continue;
    }

    const row: DataRow = {
      id: i,
      number: parseInt(values[0]) || 0,
      mod3: parseInt(values[1]) || 0,
      mod4: parseInt(values[2]) || 0,
      mod5: parseInt(values[3]) || 0,
      mod6: parseInt(values[4]) || 0,
      mod7: parseInt(values[5]) || 0,
      mod8: parseInt(values[6]) || 0,
    };

    data.push(row);
  }

  return data;
};
