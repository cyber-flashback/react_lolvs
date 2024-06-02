import { useNavigate  } from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import axios from 'axios';


const Logincallback = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();
  
    useEffect(()=> {
      axios.get("/kakaotest", {
          params: {
            code : code
          }
        }).then((res) => {
          sessionStorage.setItem("name", res.data.name)
          sessionStorage.setItem("nickname", res.data.nickname)
          sessionStorage.setItem("email", res.data.email)
          window.location.href = '/';
      })
  }, []);

    return <div>
        로그인 중입니다.

     </div>;
  };


export default Logincallback;