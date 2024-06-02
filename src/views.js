import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

function Views(){

const {id} = useParams()
const [views, setViews] = useState('');
const navigate = useNavigate();
const [up, setUp] = useState(0);

useEffect(()=> {
    axios.get("/selectone", {
        params: {
          idx : id
        }
      }).then((res) => {
        setViews(res.data);
        setUp(res.data.up);
    })
}, []);


return(
    <div className='views'>
        <table border={1}>
            <thead>
                <tr><th colSpan={4}>{views.title}</th></tr>
                <tr><td>{views.dates}</td><td>{views.name}</td><td>조회수 {views.views}</td><td>추천 {up}</td></tr>
 
            </thead>
            
            <tbody height={200}>
                <tr>
                    <td colSpan={4}>{views.detail}</td>
                </tr>
            </tbody>
            
        </table>
        
        {sessionStorage.getItem("name")=== null ? "" : <button onClick={()=>{axios.get("/suggestion", {params :{idx : id}}).then(()=>{setUp(parseInt(up)+1)})}}>추천</button>}
        <div><br/>
        <button onClick={()=>{navigate('/tip')}}>목록</button>&ensp;
        {sessionStorage.getItem("name")=== null ? "" : <button onClick={()=>{navigate('/modify/'+id)}}>수정</button>}&ensp;
        {sessionStorage.getItem("nickname") === views.name ? <button onClick={()=>{axios.get("/deletetip", {params :{idx : id}}).then(()=>{navigate('/tip')})}}>삭제</button> : ""}
        </div>
        </div>
)

}


export default Views