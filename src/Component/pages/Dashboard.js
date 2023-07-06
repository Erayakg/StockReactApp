import * as React from 'react';
import { Box, Typography, Card, CardContent, CardHeader, Grid, List, ListItem, ListItemText, Button, ListItemSecondaryAction, IconButton, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

import { useState,useEffect } from 'react';

const Dashboard = () => {

    
  const [openDialog, setOpenDialog] = useState(false);
  const [portfolioName, setPortfolioName] = useState("");
    
 
  const handleCreatePortfolio = () => {
    setOpenDialog(true);
  }
  
  const handleDialogClose = () => {
    setOpenDialog(false);
  }
  
  const handlePortfolioNameChange = (event) => {
    setPortfolioName(event.target.value);
  }
  
  const handlePortfolioSubmit = () => {
    const token = localStorage.getItem("jwt");
    const id=localStorage.getItem("UserId");
    
    axios.post("/portfolio/create", JSON.stringify({ name: portfolioName , id:id}), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    .then(response => {
      console.log(response.data);
      // Here you may want to update your portfolio list with the new portfolio
    })
    .catch(error => {
      console.error(error);
    });
    
    handleDialogClose();
  }


    function fetchData(){

        const token = localStorage.getItem("jwt");
        const id=localStorage.getItem("UserId");
        const url="/user/"+id;
        
        axios.get(url, {
          headers: {
              Authorization: 'Bearer ' + token 
          }
        })
        .then(response => {
        
          setUserData(response.data);
          setisLoading(true);
          console.log(response.data)
        })
        .catch(error => {
          console.error(error);
        });
        }
        
        const [UserData,setUserData]=useState(null);
        const [isLoading,setisLoading]=useState(false);
        
        useEffect(()=>{
        
          fetchData();
          console.log(UserData);
        
        },[])

  let navigate = useNavigate();


  const handleCardClick = (portfolio) => {
    navigate(`/portfolio/${portfolio.name}`);
  }


  const handleBuyCoin = (portfolio) => {
    // Handle buy coin logic here
  }

  const handleSellCoin = (coin) => {
    // Handle sell coin logic here
  }
  if(!isLoading){
    return(
        <CircularProgress></CircularProgress>
    )
  }
  return (
        <>
    <Dialog open={openDialog} onClose={handleDialogClose}>
    <DialogTitle>Create a new Portfolio</DialogTitle>
    <DialogContent>
      <TextField 
        autoFocus
        margin="dense"
        label="Portfolio Name"
        fullWidth
        value={portfolioName}
        onChange={handlePortfolioNameChange}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleDialogClose}>Cancel</Button>
      <Button onClick={handlePortfolioSubmit}>Create</Button>
    </DialogActions>
  </Dialog>

    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Portfolio
      </Typography>

      <Box sx={{ bgcolor: 'success.main', p: 2, mb: 3 }}>
        <Typography variant="h6" color="white">
          Kazanç / Zarar: + $ 1500.00
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {UserData.portfolios.length === 0 ? (
          <Button variant="contained" color="primary" onClick={handleCreatePortfolio}>
            Create Portfolio
          </Button>
        ) : (
          UserData.portfolios.map((portfolio, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  action={
                    <IconButton onClick={() => handleBuyCoin(portfolio)}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                  }
                  title={portfolio.name}
                />
                <CardContent>
                  <List>
                    {UserData.portfolios.PortfolioCoin.map((coin, index) => (
                      <ListItem key={index}>
                        <ListItemText 
                          primary={coin.name}
                          secondary={`Amount: ${coin.bougthPrice}, Cost: $${coin.salePrice}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" onClick={() => handleSellCoin(coin)}>
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
    </>

  );
};

export default Dashboard;
