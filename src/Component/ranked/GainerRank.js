import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';


function Row({portfolio,Coindata}) {
 
  const [open, setOpen] = React.useState(false);

  const getCurrentValueOfCoin = (coinName) => {
    const coin = Coindata.find(coin => coin.symbol === coinName);
    console.log(coin)
    return coin ? coin.lastPrice : 0; 
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
       
        <TableCell component="th" scope="row">
        {portfolio.name}

        </TableCell>
        <TableCell align="right">{portfolio.portfolioCoins.length}</TableCell>
        <TableCell align="right">sdfsd</TableCell>
        <TableCell align="right">asdasd</TableCell>
        <TableCell align="right">asdasda</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
            <Grid container alignItems="center" justifyContent="space-between">

              <Typography variant="h6" gutterBottom component="div">
                Özet
              </Typography>
              <Button variant="contained" color="primary">
        Detay
      </Button>
      </Grid>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Coin Adı</TableCell>
                    <TableCell>Alım fiyatı</TableCell>
                    <TableCell align="right">Adet</TableCell>
                    <TableCell align="right">Kar/Zarar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {portfolio.portfolioCoins.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                    <TableCell component="th" scope="row">
                        {historyRow.name}
                    </TableCell>
                    <TableCell>{historyRow.bougthPrice}</TableCell>
                    <TableCell align="right">{historyRow.quantity}</TableCell>
                    <TableCell align="right">
                        {
                         (parseFloat(getCurrentValueOfCoin(historyRow.name))-parseFloat(historyRow.bougthPrice))*historyRow.quantity
                       }
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function GainerRank({data,Coindata}) {

  const [isLoaded, setisLoaded] = useState(false);

useEffect(() => {
  if (data != null || Coindata !=null) {
    setisLoaded(true);
    console.log(data);
  }
}, [data]);

if (!isLoaded || !data) {
  return <div><CircularProgress/></div>;
}

  return (
    <TableContainer component={Paper} style={{ maxHeight: 440, overflowY: 'auto', overflowX: 'hidden' }}  >
      <Table aria-label="collapsible table">
        <TableHead>
        <TableRow>
             <TableCell />
          <TableCell>Portfolio Name</TableCell>
           <TableCell align="right">Toplam Coin Çeşidi</TableCell>
         <TableCell align="right">Portfolio Değeri</TableCell>
       <TableCell align="right">Kar/Zarar</TableCell>
           <TableCell align="right"><Button>Detay</Button></TableCell>
           </TableRow>
         </TableHead>
        <TableBody>
          {data.map((portfolio) => (
            <Row key={portfolio.id} portfolio={portfolio}  Coindata={Coindata}  />
         ))}
     </TableBody>
    </Table>
 </TableContainer>
   
  );
}