import React, { useState, useEffect } from 'react';
import axios from "axios";
import useParams from "axios"
import CircularProgress from '@mui/material/CircularProgress';
import UserDetails from "./UserDetails"



function LoginUserinfo(props) {
 
  // const [userData, setUserkData] = useState([]);
  //  const [loaded, setLoaded] = useState(false)
  // const URL = "/user/all"
  // const id=useParams(); 
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // function fetchData() {
  //   axios.get(URL)
  //     .then(function (response) {
  //       const responseData = Array.isArray(response.data) ? response.data : Object.values(response.data);
  //       setUserkData(responseData);
  //       setLoaded(true);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }


  // if (!loaded) {
  //   return <div>
  //  <LoginUserinfo />
  //   </div>
  // }
  // else
    return (
      <div>
<UserDetails />
      </div>
    );

 }
export default LoginUserinfo;