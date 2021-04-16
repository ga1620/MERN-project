import React ,{useState,useContext,useEffect} from "react";
import { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {BiSmile,BiWinkSmile} from "react-icons/bi";
import {GiHumanTarget} from "react-icons/gi";
import {AiOutlinePlusCircle} from "react-icons/ai";
import ReactTooltip from 'react-tooltip';
import "./mainpage.css";
import {UserContext} from "./context";
import axios from "axios";
import {Spinner} from "react-bootstrap";




const Mainpage = () => {
const name = window.sessionStorage.getItem('id');

const [activeUser,setActiveUser] = useState({
  profile:"undefined-1618546743689download.jpg",
});
const [postDesc,setPostDesc] = useState('');
const [postList,setPostList] = useState([]);
const [userList,setUserList] = useState([]);
const [postComm,setPostComm] = useState('');
const [loading,setLoading] = useState(false);




const getpostList = () => {
  axios.get('http://localhost:5000/post').then(result => {
    const data = result.data.result;
    setPostList(data);
  })
  .catch(err => {
    alert(err.message);
  })
  console.log("no....")
}

const getuserList = () => {
  axios.get('http://localhost:5000/getuser').then(result => {
    const data = result.data.result;
    setUserList(data);
    console.log(userList);
  })
  .catch(err => {
    alert(err.message);
  })

  
}

const postComment = (e,id) => {
  e.preventDefault();
  axios.put('http://localhost:5000/post/comment',{
    postid:id,
    username:activeUser.username,
    profile:activeUser.profile,
    comm:postComm
  })
  .then(result => {
    alert('Comment posted')
    setPostComm('');
  })
  .catch(err => {
   return alert('repost the comment');
  })
}

const postPost = (e) => {
  e.preventDefault();
  const divo = document.getElementById('postsucess');
  const hidediv = document.getElementById('hided');
   hidediv.style.display="none";
  divo.style.display="flex";
   setLoading(true);
   const formData = new FormData();
   const imagefile = document.getElementById('postfile');
formData.append("file", imagefile.files[0]);
formData.append("id", activeUser._id);
formData.append("disc", postDesc);
axios.post('http://localhost:5000/uploadpost',formData, {
  headers: {
    'Content-Type':'multipart/form-data'
  }})
  .then(res => {
    setLoading(false);
        const heading = document.getElementById('heading');
        heading.innerText=`Post Uploaded...`;
          hidediv.style.display="block";
          divo.style.display="flex";
  }).catch(err => {
    setLoading(false);
        const heading = document.getElementById('heading');
        heading.innerText=`Re-post Again..`;
          hidediv.style.display="block";
          divo.style.display="flex";
          setPostDesc('');
          const postdiv = document.getElementById('postcon');
          postdiv.style.display="none";   
  })

}

const changeDp = (e) => {
  e.preventDefault();
  const divo = document.getElementById('postsucess');
  const hidediv = document.getElementById('hided');
   hidediv.style.display="none";
  divo.style.display="flex";
   setLoading(true);
   const formData = new FormData();
   const imagefile = document.getElementById('profilefile');
formData.append("file", imagefile.files[0]);
formData.append("_id", activeUser._id);
axios.put('http://localhost:5000/uploaddp',formData, {
  headers: {
    'Content-Type':'multipart/form-data'
  }})
  .then(res => {
    setLoading(false);
        const heading = document.getElementById('heading');
        heading.innerText=`Profile change \n sucessfuly`;
          hidediv.style.display="block";
          divo.style.display="flex";
  }).catch(err => {
    setLoading(false);
        const heading = document.getElementById('heading');
        heading.innerText=`Re-change Again..`;
          hidediv.style.display="block";
          divo.style.display="flex";
          setPostDesc('');
          const postdiv = document.getElementById('postcon');
          postdiv.style.display="none";   
  })
}

useEffect(() =>{
  getuserList();
  getpostList();
  axios.get(`http://localhost:5000/getuser/${name}`)
  .then(result => {
    const data = result.data.result[0];
    setActiveUser(data);
  })
  .catch(err => {
    alert(err.message);
  })
},[0])





    return(
        <Fragment>
            <ReactTooltip />
          <Container fluid className="headerdiv">

          <button className="headerbutton" onClick={() => {
            const prodiv = document.getElementById('profilecon');
            prodiv.style.display="flex";
          }}>Profile</button>
              <button className="headerbutton">Logout</button>
              <h3 className="headerheading">Meme's <BiWinkSmile/> World </h3>
          </Container>
          <Container className="bottomnav" fluid>
              <div className="bottomnavdiv">
                 <AiOutlinePlusCircle className="bottomnavbutton" data-tip="Add post" onClick={() => {
                   const postdiv = document.getElementById('postcon');
                   postdiv.style.display="flex";
                 }}/>
                 <GiHumanTarget  className="bottomnavbutton" data-tip="View friend's" onClick={() => {
                   const frienddiv = document.getElementById('friendcon');
                   frienddiv.style.display="flex";
                 }}/>
              </div>
          </Container>
           <Container fluid>
              <Row style={{marginTop:"15vh"}}>
                  {
                    postList.map((value,index) => (
                      <Col lg={12} sm={12} xl={12} style={{display:"flex",justifyContent:"center",marginBottom:"50px"}} key={index}>
                      <div className="postdiv">
                       <div className="postdiv_profile">
                          <img src={require(`./uploadedimage/${value.userid.profile}`).default} alt="Profile" width="40px" height="40px" style={{borderRadius:"50%",border:"1px solid grey"}}/>
                          <p className="postdiv_name">{value.userid.username}</p>
                       </div>
                       <img src={require(`./uploadedimage/${value.image}`).default} alt="post_image" className="postdiv_image"/>
                       <p className="postdiv_dis">{value.disc}</p>
                        <p>Comment's</p>
                        <div id="commentdiv">

                          {value.comment.length ===0 ? <span>No comment</span> :
                          <ul>
                            {
                              value.comment.map((val,i) => (
                                <li key={i}><div  className="ccc">
                                <img src={require(`./uploadedimage/${val.commentuser.profile}`).default} alt="profile" width="30px" height="30px" style={{borderRadius:"50%",border:"0.5px solid grey"}} />
                                <p style={{fontWeight:"700"}} >{val.commentuser.username}</p>
                                <p style={{marginLeft:"5px"}}>{val.commentdata}</p>
                                </div></li>
                              ))
                            }

                          </ul> }


                          </div>
                          <p style={{textAlign:"center",cursor:"pointer"}} onClick={() => { const div = document.getElementById("commentdiv");
       div.style.height="auto";}}>View more</p>
                         <div className="postcomment">
                            <form onSubmit={(e) => postComment(e,value._id)}>
                           <input type="text" required  placeholder="Add comment" className="commentinput" value={postComm} onChange={(e) => setPostComm(e.target.value)}/>
                           <button type="submit" className="commentbutton">Add</button>
                          </form>
                         </div>


                      </div>
                    </Col>
                    ))}

              </Row>
          </Container>
          <Container fluid className="postContainer" id="postcon">
             <div className="postDiv">
               <form className="postForm" onSubmit={(e) => postPost(e)} enctype="multipart/form-data">
                 <input type="file" required accept="image/*" id="postfile"/><br/>
                 <input type="text" required className="distext" value={postDesc} onChange={(e) => setPostDesc(e.target.value)} placeholder="Add Discription.."/><br/>
                 <button type="submit" className="postbutton">Post</button>
                 <button  className="postbutton" type="button" style={{marginTop:"10px"}}  onClick={() =>{
                      const postdiv = document.getElementById('postcon');
                      postdiv.style.display="none";

                 }}>Cancle</button>
               </form>

             </div>
          </Container>
           <Container fluid className="postContainer" id="profilecon">
            <div className="profilediv">
              <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
                 <img src={activeUser.profile===null ? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'  :  require(`./uploadedimage/${activeUser.profile}`).default} width="90px" height="90px" style={{borderRadius:"50%",border:"0.5px solid grey"}} />
              </div>
              <div  style={{width:"100%",display:"flex",justifyContent:"space-around",paddingTop:"30px"}}>
                <form onSubmit={(e) => changeDp(e)} enctype="multipart/form-data">
                <input type="file" placeholder="upload Dp" accept="image/*" id="profilefile"/>
                <button type="submit" className="profileclose" style={{marginLeft:"36%"}}>change</button>
                </form>
              </div>
              <div style={{paddingTop:"30px",paddingLeft:"10px"}}>
                <span>Email</span>
               <h5>{activeUser.email}</h5>
               <span>User Name</span>
               <h5>{activeUser.username}</h5>
              </div>
              <div style={{width:"100%",display:"flex",justifyContent:"center",paddingTop:"20px"}}>
                <button type="button" className="profileclose" onClick={() => {
                  const profilediv = document.getElementById('profilecon');
                  profilediv.style.display="none";
                }}>close</button>
              </div>
            </div>
          </Container> 

          <Container fluid className="postContainer" id="friendcon">
              <div className="friendDiv" style={{textAlign:"center"}}>
                  <h3 className="friendheading">Friend's</h3>
                  <div style={{width:"100%",height:"70%",overflowY:"scroll"}}>
                  <ul style={{marginTop:"30px"}}>
                    {
                      userList.map((value,index) => (
                        <li className="li"><div style={{display:"flex",columnGap:"20px"}} key={index}>
                     <img src={value.profile===null ? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'  :  require(`./uploadedimage/${value.profile}`).default} alt="profile" width="30px" height="30px" style={{borderRadius:"50%",border:"0.5px solid grey"}} />
                     <p style={{fontWeight:"700"}} >{value.username}</p>
                       </div></li>
                      ))
                    }
                  </ul>
                  </div>
                  <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
                  <button  className="profileclose" type="button"  onClick={() =>{
                      const postdiv = document.getElementById('friendcon');
                      postdiv.style.display="none";

                 }}>close</button>
                 </div>
              </div>
          </Container>
          <Container fluid className="postContainer" id="postsucess">
          <div className="hidediv" id="hided">
           <h2 id="heading">Post uploaded...</h2>
           <button className="formbutton" style={{marginTop:"40px"}} onClick={() => { 
             const div = document.getElementById('postsucess');
             div.style.display="none";}}>Ok</button>

        </div>
        {
           loading?  <Spinner animation="border" variant="primary" style={{width:"50px", height:"50px"}}/> : null
        }

          </Container>
             
        </Fragment>
    );
}


export default Mainpage;