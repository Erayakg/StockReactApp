
import HomePage from "./Component/pages/HomePage";
import {Route, Routes ,Navigate  } from 'react-router-dom';
import Navbar from "./Component/pages/Navbar";
import GetStockData from "./Component/GetStockData";

import Dashboard from "./Component/pages/Dashboard";
import LoginPage from "./Component/pages/LoginPage";
import Logout from "./Component/util/Logout";
import UserDetails from "./Component/LoginUserComp/UserDetails";
import { useEffect, useState } from "react";
import PortfolioDetails from "./Component/pages/PortfolioDetails";

function App() {

  const [ıtem,setItem]=useState(null);


useEffect(()=>{

 setItem(localStorage.getItem("UserId"))

},[])
  return (
    
    <div>
      <Navbar />
      <Routes>
      <Route exact path="/"element={< HomePage/>} ></Route>
      <Route exact path="/coin/all" element={< GetStockData />}  ></Route>
      <Route path='/login' element={ ıtem ? <Navigate replace to="/" /> : <LoginPage /> } />
      
      <Route path='/dashboard' element={ ıtem ? <Dashboard /> : <Navigate replace to="/login" /> } /> 
      <Route path='/user' element={ ıtem ? <UserDetails /> : <Navigate replace to="/login" /> } />
      <Route exact path="/logout" element={<Logout />} ></Route>
      <Route exact path="/portfolio" element={<PortfolioDetails />} >   </Route>
     </Routes>
    </div>
  );
}

export default App;
