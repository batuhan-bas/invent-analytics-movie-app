import { ReactElement } from 'react';
import { Pagination as MuiPagination, Box, Typography } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalResults,
  resultsPerPage,
  onPageChange,
}: PaginationProps): ReactElement => {
  const totalPages = totalResults > 0 && resultsPerPage > 0 ? Math.ceil(totalResults / resultsPerPage) : 1;

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  if (totalResults === 0) {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        No results found.
      </Typography>
    );
  }

  return (
    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Showing {Math.min((currentPage - 1) * resultsPerPage + 1, totalResults)} -{' '}
        {Math.min(currentPage * resultsPerPage, totalResults)} of {totalResults} results
      </Typography>

      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
      />
    </Box>
  );
};

export default Pagination;
