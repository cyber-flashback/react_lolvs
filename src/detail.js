import React, {useEffect, useState, useRef} from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Container, Form, Row ,ToggleButton ,ToggleButtonGroup } from "react-bootstrap";
import axios from 'axios';
import useDidMountEffect from './useDidMountEffect.js';
import YouTube from "react-youtube";

function Detail(props){
    const {id} = useParams();
    const [value, setValue] = useState(1);
    const [liner, setLiner] = useState('');
    const [vschampion, setVschampion] = useState('');
    const [vslist, setVslist] = useState('');
    const [searchchampion, setSearchcmapion] = useState([]);
    const [searchInput, setSearchInput] = useState('')
    let [champnum, setChampnum] = useState(0);
    {searchchampion == "" ? props.champions.map((a,i)=>{searchchampion.push(props.champions[i])}) : <></>}
  
    const filteredItems = searchchampion.filter((searchchampions) =>
      searchchampions.champion.toLowerCase().includes(searchInput.toLowerCase()),
     )
     
    useEffect(() => {
        // 로컬 스토리지에서 값을 불러와서 설정
        const storedLiner = localStorage.getItem('liner');
        if (storedLiner) {
            setLiner(storedLiner); // storedLiner의 값을 넣도록 수정
        }
    }, []);
    
    useEffect(() => {
        // liner 값이 변경될 때마다 로컬 스토리지에 저장
        localStorage.setItem('liner', liner);
    }, [liner]);


    useEffect(()=>{
        let recently = sessionStorage.getItem("recently")

        if (recently == null) {
            sessionStorage.setItem("recently", JSON.stringify([localStorage.getItem("num")]))            
        }
        else if (JSON.parse(recently).length == 4){
            recently = JSON.parse(recently)
            recently.pop()
            recently.unshift(localStorage.getItem("num"))
            recently = new Set(recently)
            recently = Array.from(recently)
            sessionStorage.setItem("recently", JSON.stringify(recently))
        }
        else {
            recently = JSON.parse(recently)
            recently.unshift(localStorage.getItem("num"))
            recently = new Set(recently)
            recently = Array.from(recently)
            sessionStorage.setItem("recently", JSON.stringify(recently))
        }
    })

     useEffect(()=> {
        props.champions.map((a,i)=>{
            return(
          props.champions[i].champion === vschampion ? localStorage.setItem('vschampion', props.champions[i].image) : ''
          )
        })
        }, [vschampion]);

    useEffect(()=> {
    axios.get("/youtubelist", {
        params: {
          line : liner,
          champion: localStorage.getItem('champ'),
          vschampion : vschampion
        }
      }).then((res) => {
        setVslist(res.data);
    })
}, [vschampion]);

return (
    <>
    {props.champions.map((a,i)=>{
        return (
           props.champions[i].image.includes(id) === true ?
           <>
           <div className="detailchampion" key={i}>
              <img src={process.env.PUBLIC_URL +'/championimg/'+props.champions[i].image+'.png'} width={64}/><br/>
              {localStorage.setItem('liner', props.champions[i].line.split(',')[0])}
              {localStorage.setItem('champ', props.champions[i].champion)}
              {localStorage.setItem('num', i)}
              <span className="vschampion">
                { vschampion === '' ? '' :
                    <img src={process.env.PUBLIC_URL +'/championimg/'+localStorage.getItem('vschampion')+'.png'} width={64}/>   
                }
            </span>

           </div>
            <span className="detailchampionname">
              <b style={{fontSize: "22px"}}>{(props.champions[i].champion).replace(/\"/gi, "")}</b>
              <br/>
              {(props.champions[i].line).replace(/\"/gi, "")}
            </span>

            <div className="vschampionname">
                    <b style={{fontSize: "22px"}}>{ vschampion === '' ? '' :
                            vschampion
                        }
                    </b>
                    <div>{ vschampion === '' ? '' :localStorage.getItem("liner")}</div>
            </div>
           

            <div>
            <span className="detailline">
            {(props.champions[i].line).split(',').length-1 === 0 ?
                <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                    <ToggleButton id="tbg-radio-1" value={1}>
                    {props.champions[i].line}
                    </ToggleButton>
                </ToggleButtonGroup> : ((props.champions[i].line).split(',').length-1 === 1 ?
                    <ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={(e)=>{setValue(e)}}>
                        <ToggleButton id="tbg-radio-1" value={1} onChange={()=>{setLiner(props.champions[i].line.split(',')[0])}}>
                           {props.champions[i]?.line.split(',')[0]}
                        </ToggleButton>
                        <ToggleButton id="tbg-radio-2" value={2} onChange={()=>{setLiner(props.champions[i].line.split(',')[1])}}>
                        {props.champions[i]?.line.split(',')[1]}
                        </ToggleButton>
                    </ToggleButtonGroup> 
                :
                <ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={(e)=>{setValue(e)}}>
                    <ToggleButton id="tbg-radio-1" value={1} onChange={()=>{setLiner(props.champions[i]?.line.split(',')[0])}}>
                        {props.champions[i]?.line.split(',')[0]}
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-2" value={2} onChange={()=>{setLiner(props.champions[i].line.split(',')[1])}}>
                        {props.champions[i]?.line.split(',')[1]}   
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-3" value={3} onChange={()=>{setLiner(props.champions[i].line.split(',')[2])}}>
                        {props.champions[i]?.line.split(',')[2]}
                    </ToggleButton>
                </ToggleButtonGroup> )
                }
             </span>
            
             <Container className='search'>
                <Row>
                    <Col sm={4}>
                    <Form className="d-flex" style={{width:800}} onSubmit={(e)=>{
                        e.preventDefault();
                        e.target.reset();
                    }}>
                        <Form.Control
                        name="search"
                        type="search"
                        placeholder="상대 챔피언을 검색하세요"
                        className="me-0"
                        aria-label="Search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        />&ensp;

                    </Form>
                    </Col>
                </Row>
                </Container>
            </div>
            </>
          : '   ' 
        )
    })
    }
    <div className='detailmain'>
        {
           <span>
           {filteredItems.map((item,i)=>{
               return (
                 item.line.includes(liner) === true ?
                   <span className='searchchampion' key={i} onClick={()=>{setVschampion((item.champion))}}>
                    <img src={process.env.PUBLIC_URL +'/championimg/'+item.image+'.png'} width={40} /><br/>
                    <span style={{fontSize:11}}>{(item.champion).replace(/\"/gi, "")}</span>
                   </span> : ''
               )
             })
           }
           </span>
        }
        
        </div>
        <div className='detailpage'>
            {vslist.length === 0 ? "준비중입니다." : (vslist.slice(0,3)).map((a,i)=>{
                return(
                    vslist === '' ? "로딩중 " :
                    <span key={i} className='youtubelist' >
                    <YouTube
                        videoId={vslist[i]?.videoid} //동영상 주소
                        opts={{
                        width: "400vw",
                        height: '225vh',
                        playerVars: {
                        autoplay: 0, //자동 재생 여부 
                        modestbranding: 1, //컨트롤 바에 유튜브 로고 표시 여부
                        loop: 0, //반복 재생
                    },
                    }}
                        onReady={(e) => {
                        e.target.mute(); //소리 끔
                    }}
                    />  
                     </span>
                )
            })}
        </div>
        
        {sessionStorage.getItem("name") === "최재안" ?
            <button onClick={()=>
            axios.get("/test2", {
                params: {
                  line : liner,
                  champion: localStorage.getItem('champ'),
                  vschampion : vschampion
                }
              })
              .then(function (response) {
                   // response  
              }).catch(function (error) {
                  // 오류발생시 실행
              }).then(function() {
                  // 항상 실행
              })
        }>유튜브 추가하기</button>: ""}

    </>
    )
}


export default Detail