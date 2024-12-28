'use client';

import { ReactElement, useState, FormEvent } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps): ReactElement => {
  const [searchTerm, setSearchTerm] = useState('Pokemon');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      display="flex"
      flexDirection={"row"}
      gap={2}
      alignItems="center"
    >
      <TextField
        label="Search Movies"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" size='large'>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
