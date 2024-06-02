import { useNavigate  } from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import axios from 'axios';

function Logout(){
    const navigate = useNavigate();
    sessionStorage.clear();

    useEffect(()=> {
        axios.get("/logout", {
          }).then((res) => {
            navigate('/');
        })
    }, []);

    return(
        <div>로그아웃</div>
    )
}

export default Logout