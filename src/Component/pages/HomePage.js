

import Coininfo from "../Coininfo/Coininfo";
import GetStockData from "../GetStockData";

import "../ranked/ranked.css"




export default function HomePage(){
    return(
<div>
<div className="container">
      
    
    
      <div className="Coininfo" > <GetStockData /></div>
    </div>

</div>

    )
}