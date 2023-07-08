import React, { useState, useEffect } from 'react';
import axios from "axios";
import Coininfo from './Coininfo/Coininfo';
import CircularProgress from '@mui/material/CircularProgress';
import GainerRank from './ranked/GainerRank';
import Userrank from "./ranked/Userrank"
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function GetStockData() {
  const [stockData, setStockData] = useState([]);
  const [portfolioData, setportfolioData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const URL = "/coin/all";
    const URL2 = "/portfolio/getAll";

    function fetchData() {
      axios
        .get(URL)
        .then(function (response) {
          const responseData = Array.isArray(response.data)
            ? response.data
            : Object.values(response.data);
          setStockData(responseData);
          console.log("Coin Data:", responseData);

        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function fetchData2() {
      axios
        .get(URL2)
        .then(function (response) {
          const responseData = Array.isArray(response.data)
            ? response.data
            : Object.values(response.data);
          setportfolioData(responseData);
          console.log("Portfolio Data:", responseData);

        })
        .catch(function (error) {
          console.log(error);
        });
    }

    fetchData();
    fetchData2();
    setLoaded(true);
  }, []);


  if(!loaded) {
    return <div><CircularProgress /> </div>; //Veri yüklenene kadar bu mesajı göster
  } else {
    return (
      <div>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Paper elevation={3} style={{ padding: '10px', margin: '5px' }}>
            <GainerRank data={portfolioData} Coindata={stockData} />
          </Paper>
        </Grid>
  
        <Grid item xs={5}>
          <Paper elevation={3} style={{ padding: '10px', margin: '5px' }}>
            <Userrank />
          </Paper>
        </Grid>
      </Grid>
      <div style={{ marginTop: '20px' }}>
        <Coininfo data={stockData} />
      </div>
    </div>
    );
  }
}

export default GetStockData;
