import * as React from 'react';
import { Box, Typography, Card, CardContent, CardHeader, Grid, List, ListItem, ListItemText, Button, ListItemSecondaryAction, IconButton, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';

import { useState,useEffect } from 'react';
import PortfolioCard from './PortfolioCard';
import AlertTitle from '@mui/material/AlertTitle';

import DeleteIcon from '@mui/icons-material/Delete';

const Dashboard = () => {
 
  const [ bougthprice, setBoughtPrice] = useState(null);
  const [coinName, setCoinName] = useState('');
  const [quantity, setQuantity] = useState(null);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState(null);
  const [openCoinDialog, setOpenCoinDialog] = useState(false); 
  const [StockData,SetStockDAta]=useState(null);
  const [openSellCoinDialog, setOpenSellCoinDialog] = useState(false); 
  const [sellQuantity, setSellQuantity] = useState(null);
  const [selectedCoinName, setSelectedCoinName] = useState('');
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  const [sellQuantity1, setSellQuantity1] = useState(null);
  const [openSellCoinDialog1, setOpenSellCoinDialog1] = useState(false); 
  const [openError, setOpenError] = useState(false);

  const[openTrue,SetOpenTrue]=useState(false)

  const [error, setError] = useState("");






  const handleSellCoinDialog1 = (coinName, portfolioId, coinId) => {
    setSelectedCoinName(coinName);
    setSelectedPortfolioId(portfolioId);
    setSelectedCoinId(coinId);
    setOpenSellCoinDialog1(true);
  }

  

  const handleSellCoin1 = () => {
    const token = localStorage.getItem("jwt");
    console.log(token)
    if (!Array.isArray(StockData)) {
      console.error('StockData is not an array!');
      return;
    }

    const coin = StockData.find(coin => coin.symbol === selectedCoinName);

    if (!coin) {
      console.error('Coin not found in StockData');
      return;
    }

    const coinPrice = coin.lastPrice;
    const data = {
      portfId: selectedPortfolioId,
      coinName: selectedCoinName,
      quantity: parseFloat(sellQuantity1),
      coinprice: coinPrice,
    };
    console.log(data);

    const URL3="/portfolio/sell";
    axios.post(URL3, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    .then(response => {
      console.log('POST isteği başarılı:');
      setOpenSellCoinDialog1(false);
      fetchData();  
    })
    .catch(error => {
      console.error('POST isteği başarısız:', error);
    });
  }

  const handleSellCoinDialog = (coinName, portfolioId, coinId) => {
    setSelectedCoinName(coinName);
    setSelectedPortfolioId(portfolioId);
    setSelectedCoinId(coinId); // Coin ID'yi state'e atıyoruz
    setOpenSellCoinDialog(true);
}

const handleSellCoin = () => {
  const token = localStorage.getItem("jwt");

  if (!Array.isArray(StockData)) {
    console.error('StockData is not an array!');
    return;
  }

  const coin = StockData.find(coin => coin.symbol === selectedCoinName);

  if (!coin) {
    console.error('Coin not found in StockData');
    return;
  }

  const salesPrice = coin.lastPrice;
  if (sellQuantity < 0 || sellQuantity > coin.quantity) {

    setError("Hatalı miktar girildi. Miktar, mevcut miktarı aşamaz ve negatif olamaz.");
    setOpenError(true);  // this will open the Snackbar
    return;
  }
  setError(null);  // if any error existed before, clear it

  const data = JSON.stringify([{
    name: selectedCoinName,
    id: selectedCoinId
  }]);
  console.log(data);

  const URL2="/portfolio/delete/coin/"+selectedPortfolioId;
  axios.delete(URL2, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    data: data
  })

  setOpenSellCoinDialog(false);
}

  const handleSubmit = (e) => {
    const token = localStorage.getItem("jwt");

    e.preventDefault();
    // Verileri JSON formatına dönüştür
    const data = JSON.stringify([{
      bougthprice,
      coinName,
      quantity, 
    }]);

    const URL="/portfolio/add/"+selectedPortfolioId
   
    
    axios.post(URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token

      }
    })
      .then(response => {
        
        console.log('POST isteği başarılı:');
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
          console.log(response.data)
          setisLoading(true);
        
        })
        .catch(error => {
          console.error(error);
        });
        }

        const [UserData,setUserData]=useState(null);
        const [isLoading,setisLoading]=useState(false);
        
        useEffect(()=>{
          
        function fetchData2() {
          const URL = "/coin/all";
          axios
            .get(URL)
            .then(function (response) {
              const responseData = Array.isArray(response.data)
                ? response.data
                : Object.values(response.data);
              SetStockDAta(responseData)
            })
            .catch(function (error) {
              console.log(error);
            });
        }

          fetchData();
          fetchData2();
            
        },[])


  let navigate = useNavigate();


  const handleCardClick = (portfolio) => {
    navigate(`/portfolio/${portfolio.name}`);
  }


  const handleBuyCoin = (portfolio) => {
    setOpenCoinDialog(true);
    setSelectedPortfolioId(portfolio.id);
  }
  
  if(!isLoading){
    return(
        <CircularProgress></CircularProgress>
    )
  }
  return (
       
   <>

<Dialog open={openSellCoinDialog1} onClose={() => setOpenSellCoinDialog1(false)}>
      <DialogTitle>Sat1</DialogTitle>
      <DialogContent>
        <TextField 
          autoFocus
          margin="dense"
          label="Miktar"
          type="number"
          fullWidth
          value={sellQuantity1}
          onChange={(e) => setSellQuantity1(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenSellCoinDialog1(false)}>İptal</Button>
        <Button onClick={handleSellCoin1}>Sat1</Button>
      </DialogActions>
    </Dialog>

   <Dialog open={openSellCoinDialog} onClose={() => setOpenSellCoinDialog(false)}>
   <Alert severity="warning">
        <AlertTitle>Uyarı</AlertTitle>
  <strong>Coin portfoliodan silinecek!</strong>
      </Alert>
  <DialogContent>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenSellCoinDialog(false)}>İptal</Button>
    <Button onClick={handleSellCoin}>Sil</Button>
  </DialogActions>
</Dialog>

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

  <Box sx={{ flexGrow: 1, padding: 3, backgroundColor: '#f5f5f5' }}>      <Typography variant="h4" gutterBottom>
        Portfolio
      </Typography>
<PortfolioCard></PortfolioCard>


      <Box sx={{ bgcolor: 'success.main', p: 2, mb: 3 }}>
      <Typography variant="h6" sx={{ color: 'white' }}>
          Kazanç / Zarar: + $ 1500.00
        </Typography>
      </Box>
      <Button 
  variant="contained" 
  color="primary" 
  onClick={handleCreatePortfolio} 
  sx={{ 
    mt: 2, 
    mb: 2, 
    fontSize: '18px', 
    backgroundColor: 'purple', 
    '&:hover': {
      backgroundColor: 'darkblue',
    },
    boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
    padding: '10px 20px', 
  }} 
>
  Create Portfolio
</Button>


      <Grid container spacing={3}>
        {UserData.portfolios === null ? (
        <p>Portfolio ekle</p>
        ) : (
          UserData.portfolios.map((portfolio, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{backgroundColor: '#fff', boxShadow: '0px 0px 20px rgba(0,0,0,0.1)', borderRadius: '15px'}}>
                <CardHeader
                  action={
                    <IconButton sx={{color: '#2962ff'}} onClick={() => handleBuyCoin(portfolio)}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                  }
                  title={<Typography sx={{fontSize: '1.5em', color: '#3f51b5'}}>{portfolio.name}</Typography>}
                />
                <CardContent>
                <List>
            {portfolio.portfolioCoins !== null ? (
              portfolio.portfolioCoins.map((coin, index) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={coin.name}
                    secondary={`Amount: ${coin.quantity}, Cost: $${coin.bougthPrice}`}
                  />
                  <ListItemSecondaryAction>
                    
                  <Button onClick={() => handleSellCoinDialog1(coin.name, portfolio.id, coin.id)}>Sat</Button>
                  <IconButton  onClick={() => handleSellCoinDialog(coin.name, portfolio.id, coin.id)}   aria-label="delete">
                    <DeleteIcon />
                   </IconButton>
             
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