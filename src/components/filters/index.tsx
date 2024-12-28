'use client';

import { ReactElement, useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Box, SelectChangeEvent } from '@mui/material';

interface FiltersProps {
  onFilterChange: (filters: { year: string; type: string }) => void;
}

const Filters = ({ onFilterChange }: FiltersProps): ReactElement => {
  const [year, setYear] = useState<string>('');
  const [type, setType] = useState<string>('');

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setYear(value);
    onFilterChange({ year: value, type });
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    setType(value);
    onFilterChange({ year, type: value });
  };

  return (
    <Box display="flex" gap={2}>
      <TextField
        label="Year"
        variant="outlined"
        type="number"
        value={year}
        onChange={handleYearChange}
        fullWidth
      />
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          value={type}
          onChange={handleTypeChange}
          label="Type"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="movie">Movie</MenuItem>
          <MenuItem value="series">TV Series</MenuItem>
          <MenuItem value="episode">Episode</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filters;
