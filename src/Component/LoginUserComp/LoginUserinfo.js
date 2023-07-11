import React, { useState, useEffect } from 'react';
import axios from "axios";
import useParams from "axios"
import CircularProgress from '@mui/material/CircularProgress';
import UserDetails from "./UserDetails"



function LoginUserinfo(props) {

    return (
      <div>
<UserDetails />
      </div>
    );

 }
export default LoginUserinfo;