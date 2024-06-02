import React,{useEffect, useState} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { tipData } from './champion/tipSlice';
import axios from 'axios';

function Tip(props){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tip = useSelector((state) => state.tip);
    const [currentpage , setCurrentpage] = useState(1); // 현재페이지

    function totalpage(){
		var array = [];
      	for (let i = tip.tips[0]?.firstnumber; i <= tip.tips[0]?.lastnumber; i++) {
    		array.push(
            <span 
                key={i}
                onClick={() => dispatch(tipData(i))
                } // 각 숫자를 클릭할 때 해당 숫자를 전달
                style={{ cursor: 'pointer' }}
            >&ensp;{i}&ensp;
            </span>);
    	}
	    return array
    }

     useEffect(() => {  
        dispatch(tipData());
    }, [dispatch]); // 현재 페이지 값이 변경될 때마다 실행
    
    return(
        <>
   
        <table border={1} className="">
            <thead>
            <tr><th>글제목</th><th>글쓴 시간</th><th>글쓴이</th><th>조회수</th><th>추천</th></tr>
            </thead>
            <tbody>
            
                {tip.tips.map((a,i)=>{
                    return(
                        <>
                        <tr>
                            <td><Link to={`/tip/${tip.tips[i].idx}`} style={{
                                color: 'inherit',
                                textDecoration: 'none'
                            }}>{tip.tips[i]?.title}
                            </Link></td>
                            <td>{tip.tips[i]?.dates}</td>
                            <td>{tip.tips[i]?.name}</td>
                            <td>{tip.tips[i]?.views}</td>
                            <td>{tip.tips[i]?.up}</td>
                        </tr>
                        </>                           
                    )
                })}
            </tbody>
        </table>
        <div>
        <span onClick={()=>{dispatch(tipData(tip.tips[0]?.prev))}} style={{ cursor: 'pointer' }}>{tip.tips[0]?.prev > 1 ? "이전":<></>}</span>
        {totalpage()}
        <span onClick={()=>{dispatch(tipData(tip.tips[0]?.next))}} style={{ cursor: 'pointer' }}>{tip.tips[0]?.next < tip.tips[0]?.totalpage ? "다음":<></>}</span>
        </div>
        {sessionStorage.getItem("name")=== null ? "" :
        <button onClick={()=>{
            navigate('/write')
        }}>글쓰기</button>}

        <br/>
      

        </>
)
}

export default Tip;