import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState, useEffect } from 'react';

function Coininfo({ data }) {
  const [isLoaded, setisLoaded] = useState(false);

  useEffect(() => {
    if (data != null) {
      setisLoaded(true);
    }
  }, [data]);

  if (!isLoaded) {
    return <div><CircularProgress/></div>;
  }

  const responseData = Array.isArray(data) ? data : Object.values(data);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>symbol</TableCell>
            <TableCell align="right">lastPrice</TableCell>
            <TableCell align="right">bidPrice</TableCell>
            <TableCell align="right">highPrice</TableCell>
            <TableCell align="right">volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {responseData.map((row) => (
            <TableRow
              key={row.firstId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.symbol}
              </TableCell>
              <TableCell align="right">{row.lastPrice}</TableCell>
              <TableCell align="right">{row.bidPrice}</TableCell>
              <TableCell align="right">{row.highPrice}</TableCell>
              <TableCell align="right">{row.volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Coininfo;
