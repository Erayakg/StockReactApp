
import HomePage from "./Component/pages/HomePage";
import {Route, Routes } from 'react-router-dom';
import Navbar from "./Component/pages/Navbar";
import GetStockData from "./Component/GetStockData";
import LoginUserinfo from "./Component/LoginUserComp/LoginUserinfo";
import Dashboard from "./Component/pages/Dashboard";
import LoginPage from "./Component/pages/LoginPage";

function App() {
  return (
    
    <div>
      <Navbar />
     <Routes>
     <Route exact path="/"element={< HomePage/>} ></Route>
      <Route exact path="/coin/all" element={< GetStockData />}  ></Route>
      <Route exact path='/user' element={< LoginUserinfo />}  ></Route>
      <Route  exact path='/dashboard' element={< Dashboard />} >  </Route>
      <Route exact path='/login' element={<LoginPage />} > </Route>
     </Routes>
    </div>
  );
}

export default App;
