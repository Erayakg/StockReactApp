import * as React from 'react';
import { Box, Typography, Card, CardContent, CardHeader, Grid, List, ListItem, ListItemText, Button, ListItemSecondaryAction, IconButton, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

import { useState,useEffect } from 'react';
import DialogContentText from '@mui/material/DialogContentText';

const Dashboard = () => {
  const [ bougthprice, setBoughtPrice] = useState(null);
  const [coinName, setCoinName] = useState('');
  const [quantity, setQuantity] = useState(null);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState(null); // Bu satırı ekleyin
  const [openCoinDialog, setOpenCoinDialog] = useState(false); // Bu satırı düzeltin
  
  const handleSubmit = (e) => {
    const token = localStorage.getItem("jwt");

    e.preventDefault();
    console.log(token)
    // Verileri JSON formatına dönüştür
    const data = JSON.stringify([{
      bougthprice,
      coinName,
      quantity, 
    }]);

    const URL="/portfolio/add/"+selectedPortfolioId
    // POST isteği gönder
    console.log(URL)
    console.log(data)
    axios.post(URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token

      }
    })
      .then(response => {
        
        console.log('POST isteği başarılı:', response.data);
        setOpenCoinDialog(false);
        fetchData();  
      })
      .catch(error => {
        console.error('POST isteği başarısız:', error);
      });

    // Input alanlarını temizle
    setBoughtPrice(null);
    setCoinName('');
    setQuantity(null);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [portfolioName, setPortfolioName] = useState("");
  
 
  const handleCreatePortfolio = () => {
    setOpenDialog(true);
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCoinDialog = () => {
    setOpenCoinDialog(false);
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
      fetchData();
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
    setOpenCoinDialog(true);
    setSelectedPortfolioId(portfolio.id);
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
      <Dialog open={openCoinDialog} onClose={() => setOpenCoinDialog(false)}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Coin Ekle
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* Input alanları */}
              <TextField
                label="Bought Price"
                type="number"
                value={bougthprice}
                onChange={(e) => setBoughtPrice(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                label="Coin Name"
                value={coinName}
                onChange={(e) => setCoinName(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary">
                Ekle
              </Button>
            </form>
          </CardContent>
        </Card>
      </Dialog>

       
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
      <Button variant="contained" color="primary" onClick={handleCreatePortfolio}>
            Create Portfolio
          </Button>

      <Grid container spacing={3}>
        {UserData.portfolios === null ? (
        <p>Portfolio ekle</p>
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
            {portfolio.portfolioCoins !== null ? (
              portfolio.portfolioCoins.map((coin, index) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={coin.name}
                    secondary={`Amount: ${coin.bougthprice}, Cost: $${coin.salePrice}`}
                  />
                  <ListItemSecondaryAction>
                    {/* Gerekli işlemleri burada gerçekleştirin */}
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            ) : (
              <Button onClick={handleClickOpen}>Coin ekle</Button>
            )}
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
