import React , {useState,useEffect,useContext} from "react"
import { Col, Container, Row,Form,Button,Spinner} from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {BiWinkSmile} from "react-icons/bi";
import 'react-tabs/style/react-tabs.css';
import './loginsignin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from "react";
import axios from "axios";
import {Redirect, useHistory} from "react-router-dom";
import {UserContext} from "./context";


const LoginSignin = () => {

  const context = useContext(UserContext);
  
 const [loginemail,setLoginemail] = useState('');
 const [loginpassward,setLoginpassward] = useState('');
 const [signinemail,setSigninemail] = useState('');
 const [signinusername,setSigninusername] = useState('');
 const [signinpassward,setSigninpassward] = useState('');
 const [loading, setLoading] = useState(false);
 const [image,setImage] =useState('');



  const loginUserData = (e) => {
    e.preventDefault();
    const divo = document.getElementById('outerhidediv');
    const hidediv = document.getElementById('hided');
     hidediv.style.display="none";
    divo.style.display="flex";
     setLoading(true);
   
     axios.get(`http://localhost:5000/login/${loginemail}/${loginpassward}`)
     .then( res => {
       const data = res.data.result;
       console.log(res.data.result);
       setImage(data[0].profile);
       if(data[0].passward !== loginpassward)
       {
        setLoading(false);
        const heading = document.getElementById('heading');
        heading.innerText=`Passward not matching...`;
          hidediv.style.display="block";
          divo.style.display="flex";
          console.log(image);
       }
       else
       {
         setLoading(false);
         const divo = document.getElementById('outerhidediv');
         divo.style.display="none";
         window.sessionStorage.setItem("id",`${data[0]._id}`);
         window.location="/memesworld";
       }
     })
     .catch(err => {
      setLoading(false);
      const heading = document.getElementById('heading');
      heading.innerText=`User Not exit...\nplease signup`;
        hidediv.style.display="block";
        divo.style.display="flex";
     })


  }





   const signUserData= (e) => {
     e.preventDefault();
    const divo = document.getElementById('outerhidediv');
    const hidediv = document.getElementById('hided');
     hidediv.style.display="none";
    divo.style.display="flex";
     setLoading(true);
    axios.post(`http://localhost:5000/signin/${signinemail}/${signinpassward}/${signinusername}`)
    .then(res => {
      setLoading(false);
      const heading = document.getElementById('heading');
      heading.innerText=`Signin sucessfully !! \n please login..`;
        hidediv.style.display="block";
        divo.style.display="flex";
      setSigninemail('');
      setSigninusername('');
      setSigninpassward('');  
    })
    .catch(err => {
      setLoading(false);
      const heading = document.getElementById('heading');
       if(err.message === "Network Error")
        {
          heading.innerText="Something went to wrong...Please try again later..";
          hidediv.style.display="block";
          divo.style.display="flex";
          setSigninemail('');
        setSigninusername('');
        setSigninpassward('');
        }
        else
        {
        console.log(err.message)
        heading.innerText="User with this email'id is already found...";
        hidediv.style.display="block";
        divo.style.display="flex";
        setSigninemail('');
      setSigninusername('');
      setSigninpassward('');
       }
    })
   }

  return(
    <Fragment>
    <Container fluid className="frontpagediv">
         <div className="loginsignindiv">
           <h3 className="tabheading">Meme's <BiWinkSmile/> World </h3>
<Tabs >
    <TabList>
      <Tab style={{marginLeft:"10px"}}>Login</Tab>
      <Tab style={{marginLeft:"20px"}}>Signin</Tab>
    </TabList>

    <TabPanel className="tabpannel">
    <Form style={{paddingTop:"30px",height:"340px"}} onSubmit={e => loginUserData(e)}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" required value={loginemail} onChange={e => setLoginemail(e.target.value)}/>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" required value={loginpassward} minLength={8} onChange={e => setLoginpassward(e.target.value)}/>
  </Form.Group>

 <Container style={{textAlign:"center",paddingTop:"30px"}}>
  <button  type="submit" className="formbutton" >
    Login
  </button>
  </Container>
  </Form>
    </TabPanel>
    <TabPanel className="tabpannel">




    <Form style={{paddingTop:"30px",height:"340px"}}  onSubmit={e => signUserData(e)}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" required value={signinemail} onChange={(e) => setSigninemail(e.target.value)}/>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" placeholder="Username"  required value={signinusername}  minLength={4} onChange={(e) => setSigninusername(e.target.value)}/>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" required value={signinpassward} minLength={8} onChange={(e) => setSigninpassward(e.target.value)}/>
  </Form.Group>
  <Container style={{textAlign:"center"}}>
  <button  type="submit" className="formbutton">
    Signin
  </button>
  </Container>
</Form>
    </TabPanel>
  </Tabs>


         </div>
    </Container>
    <Container fluid id="outerhidediv">
        <div className="hidediv" id="hided">
           <h2 id="heading">Sign in sucessfully !!<br/>please login...</h2>
           <button className="formbutton" style={{marginTop:"40px"}} onClick={() => { 
             const div = document.getElementById('outerhidediv');
             div.style.display="none";}}>Ok</button>
        </div>
        {
           loading?  <Spinner animation="border" variant="primary" style={{width:"50px", height:"50px"}}/> : null
        }
        </Container>
    </Fragment>
  )
}

export default LoginSignin;