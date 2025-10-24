import React, { useState } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { useQuery } from '@tanstack/react-query';

import { getCountries } from '../../services/country-service';

const CountryList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { status, data, isFetching } = useQuery({
    queryKey: ['independent', page, rowsPerPage],
    queryFn: () => getCountries(true),
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (status === 'pending') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'error') {
    return (
      <Box p={3}>
        <Paper sx={{ p: 2, backgroundColor: 'error.light' }}>Error loading countries</Paper>
      </Box>
    );
  }

  // Calculate paginated data
  const paginatedData = data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) || [];

  const totalCount = data?.length || 0;

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="countries table">
            <TableHead
              sx={{
                backgroundColor: '#e5e1da',
                '& .MuiTableCell-head': {
                  color: '#525252',
                },
              }}
            >
              <TableRow>
                <TableCell>
                  <strong>Common Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Official Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Region</strong>
                </TableCell>
                <TableCell>
                  <strong>Capital</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Population</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isFetching && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress size={24} />
                  </TableCell>
                </TableRow>
              )}
              {!isFetching && paginatedData.length > 0
                ? paginatedData.map((country: any, index: number) => (
                    <TableRow
                      key={country.cca3 || index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      hover
                    >
                      <TableCell component="th" scope="row">
                        {country.name?.common || 'N/A'}
                      </TableCell>
                      <TableCell>{country.name?.official || 'N/A'}</TableCell>
                      <TableCell>{country.region || 'N/A'}</TableCell>
                      <TableCell>{country.capital?.[0] || 'N/A'}</TableCell>
                      <TableCell align="right">
                        {country.population?.toLocaleString() || 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))
                : !isFetching && (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No countries found
                      </TableCell>
                    </TableRow>
                  )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default CountryList;
