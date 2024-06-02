import axios from 'axios'
import React, {useState, useEffect} from 'react';

function Admin(){
    const [ lolupdate, setLolupdate ] = useState('');

    return(
        <>
        <div><button onClick={()=>{
            axios({
                url: '/lolchamupdate.do',
                method: 'get'
            }).then((res) => {
                setLolupdate(res.data);
            })
        }}>롤 챔피언 수정하기</button></div>
        </>
    )
}

export default Admin