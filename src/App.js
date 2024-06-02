import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
import {Container, Nav, Navbar, Tab, Tabs, Button, Col, Form, Row } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet, Navigate, useParams,useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { lolData } from './champion/dataSlice'; // lolData 임포트
import Detail from './detail.js'
import Tip from './tip.js'
import Write from './wrtie.js'
import Views from './views.js'
import Modify from './modify.js';
import Login from './login.js';
import Logincallback from './logincallback.js';
import Logout from './logout.js';
import Admin from './admin.js';

function App() {
  const dispatch = useDispatch();
  const {champions} = useSelector((state) => state.data);
  const [searchchampion, setSearchcmapion] = useState([]);
  const [searchInput, setSearchInput] = useState('')
  
  {searchchampion == "" ? champions.map((a,i)=>{searchchampion.push(champions[i])}) : <></>}

  const filteredItems = searchchampion.filter((searchchampions) =>
    searchchampions.champion.toLowerCase().includes(searchInput.toLowerCase()),
   )
  {JSON.parse(sessionStorage.getItem("recently")) === null ? sessionStorage.setItem("recently", JSON.stringify([])) : <></>}

   console.log(JSON.parse(sessionStorage.getItem("recently")).length);

  useEffect(() => {
    dispatch(lolData());
  }, [dispatch]);
 
  return (
    <>
  <div className="App">
  <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">LOL PS</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">홈으로</Nav.Link>
            <Nav.Link href="/tip">팁과 노하우</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            {sessionStorage.getItem("name") === "최재안" ? <Nav.Link href="/admin">수정하기</Nav.Link> : ""}
            {sessionStorage.getItem("name")=== null ? <Nav.Link href="/login">로그인</Nav.Link> : <Nav.Link href="/logout">로그아웃</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
      <div className="App-header">
   <Routes>
      <Route path='/' element={
      <>
      <img src={process.env.PUBLIC_URL +'/main/mainlogo.png'}/><br/>
      <Container className='centeritem'>
                <Row>
                    <Col sm={4}>
                    <Form className="d-flex" style={{width:800}} onSubmit={(e)=>{
                        e.preventDefault();
                        e.target.reset();
                    }}>
                        <Form.Control
                        name="search"
                        type="search"
                        placeholder="챔피언을 검색하세요"
                        className="me-0"
                        aria-label="Search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        />&ensp;
                        <Button type="submit">
                        Search
                        </Button>
                    </Form>
                    </Col>
                </Row>
                </Container>
                <br/>
      <Tabs
      defaultActiveKey="home"
      id="fill-tab-example"
      className="tab"
      variant="underline"
      fill
      >
      <Tab eventKey="home" title="ALL" className='main'>
        <All champions={champions} filteredItems={filteredItems}/>
      </Tab>
      <Tab eventKey="profile" title="탑" className='main'>
        <Top champions={champions} filteredItems={filteredItems}/>
      </Tab>
      <Tab eventKey="longer-tab" title="정글" className='main'>
        <Jungle champions={champions} filteredItems={filteredItems}/>
      </Tab>
      <Tab eventKey="mid" title="미드" className='main'>
        <Mid champions={champions} filteredItems={filteredItems}/>
      </Tab>
      <Tab eventKey="ad" title="원딜" className='main'>
        <Ad champions={champions} filteredItems={filteredItems}/>
      </Tab>
      <Tab eventKey="sup" title="서포터" className='main'>
        <Supporter champions={champions} filteredItems={filteredItems}/>
      </Tab>
    </Tabs>
    {JSON.parse(sessionStorage.getItem("recently")).length > 0 ?
    <div className="recently">최근에 본 챔피언 <br/><br/>
      {JSON.parse(sessionStorage.getItem("recently")).length < 1 ? null : <img src={process.env.PUBLIC_URL +'/championimg/'+champions[JSON.parse(sessionStorage.getItem("recently"))[0]]?.image+'.png'} width={64}/>} <br/><br/>
      {JSON.parse(sessionStorage.getItem("recently")).length < 2 ? null : <img src={process.env.PUBLIC_URL +'/championimg/'+champions[JSON.parse(sessionStorage.getItem("recently"))[1]]?.image+'.png'} width={64}/>} <br/><br/>
      {JSON.parse(sessionStorage.getItem("recently")).length < 3 ? null : <img src={process.env.PUBLIC_URL +'/championimg/'+champions[JSON.parse(sessionStorage.getItem("recently"))[2]]?.image+'.png'} width={64}/>}
   </div>
    : ""}
    </>}/>
      <Route path="/detail/:id" element={<Detail champions={champions} filteredItems={filteredItems} searchInput={searchInput} setSearchInput={setSearchInput}/>} />
      <Route path="/tip" element={<Tip/>} />
      <Route path="/tip/:id" element={<Views/>} />
      <Route path="/write" element={<Write/>} />
      <Route path="/modify/:id" element={<Modify/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/logincallback" element={<Logincallback/>} />
      <Route path="/logout" element={<Logout/>} />
    </Routes>
  </div>
</div>

</>
);
}

function All(props){
  return(
    <span>
    {props.filteredItems.map((item,i)=>{
      return (
        <span className='mainchampion' key={item.champion}>
           <Link to={`/detail/${item.image}`} style={{
              color: 'inherit',
              textDecoration : 'none'
          }}>
            <img src={process.env.PUBLIC_URL +'/championimg/'+item.image+'.png'} width={64}/>
            {(item.champion).replace(/\"/gi, "")}
          </Link>
        </span>
      )
    })
  }
  </span>
  )
}

function Top(props){
  
  return(
    <span>
      {props.champions.map((a,i)=>{
          return (
            props.champions[i].line.includes('탑') === true ?
              <span className='mainchampion' key={i}>
              <Link to={`/detail/${props.champions[i].image}`} style={{
                color: 'inherit',
                textDecoration : 'none'
            }}>
              <img src={process.env.PUBLIC_URL +'/championimg/'+props.champions[i].image+'.png'} width={64}/>
              {(props.champions[i].champion).replace(/\"/gi, "")}          
            </Link>
          </span> : ''
          )
        })
      }
      </span>
  )
}

function Jungle(props){
  
  return(
    <span>
      {props.champions.map((a,i)=>{
          return (
            props.champions[i].line.includes('정글') === true ?
              <span className='mainchampion' key={i}>
              <Link to={`/detail/${props.champions[i].image}`} style={{
                color: 'inherit',
                textDecoration : 'none'
            }}>
              <img src={process.env.PUBLIC_URL +'/championimg/'+props.champions[i].image+'.png'} width={64}/>
              {(props.champions[i].champion).replace(/\"/gi, "")}          
            </Link>
          </span> : ''
          )
        })
      }
      </span>
  )
}

function Mid(props){
  
  return(
    <span>
      {props.champions.map((a,i)=>{
          return (
            props.champions[i].line.includes('미드') === true ?
              <span className='mainchampion' key={i}>
              <Link to={`/detail/${props.champions[i].image}`} style={{
                color: 'inherit',
                textDecoration : 'none'
            }}>
              <img src={process.env.PUBLIC_URL +'/championimg/'+props.champions[i].image+'.png'} width={64}/>
              {(props.champions[i].champion).replace(/\"/gi, "")}          
            </Link>
          </span> : ''
          )
        })
      }
      </span>
  )
}

function Ad(props){
  
  return(
    <span>
      {props.champions.map((a,i)=>{
          return (
            props.champions[i].line.includes('원딜') === true ?
              <span className='mainchampion' key={i}>
              <Link to={`/detail/${props.champions[i].image}`} style={{
                color: 'inherit',
                textDecoration : 'none'
            }}>
              <img src={process.env.PUBLIC_URL +'/championimg/'+props.champions[i].image+'.png'} width={64}/>
              {(props.champions[i].champion).replace(/\"/gi, "")}          
            </Link>
          </span> : ''
          )
        })
      }
      </span>
  )
}

function Supporter(props){
  
  return(
    <span>
      {props.champions.map((a,i)=>{
          return (
            props.champions[i].line.includes('서포터') === true ?
              <span className='mainchampion' key={i}>
              <Link to={`/detail/${props.champions[i].image}`} style={{
                color: 'inherit',
                textDecoration : 'none'
            }}>
              <img src={process.env.PUBLIC_URL +'/championimg/'+props.champions[i].image+'.png'} width={64}/>
              {(props.champions[i].champion).replace(/\"/gi, "")}          
            </Link>
          </span> : ''
          )
        })
      }
      </span>
  )
}


export default App;