import React,{useState, useEffect} from "react";
import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import { Routes, Route, Link, useNavigate,useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { API } from "./global";
import EditIcon from '@mui/icons-material/Edit';


export default function User() {
  let navigate = useNavigate();
  return (
    <div>
      /*****************BUTTON FOR CHOOSING OPTION******************************************* */
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button  onClick={() => navigate("/adduser")}>Add user</Button>
      <Button  onClick={() => navigate("/displayuser")}>Display User</Button>
    </ButtonGroup>

      
      <Routes>
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/displayuser" element={<DisplayUser />} />
        <Route path="/user/edit/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
}

function AddUser() {
  const navigate= useNavigate();
  const [uname, setName] = useState("");
    const [uaddr,setAddr]=useState("");
    const [uprofile, setProfile] = useState("");
     const [udob, setDob] = useState(new Date());
    
   
  return (
    <div>
     <h1> Enter the details of the user you want to add.</h1>
      
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <form>
          <TextField id="outlined-search" label="Enter Name" type="search"
            onChange={(e)=>setName(e.target.value)}
          />
          <TextField id="outlined-search" label="Enter Address" type="search"
            onChange={(e)=>setAddr(e.target.value)}
          />
          
          <TextField id="outlined-search" label="Profile pic address" type="search" 
           onChange={(e)=>setProfile(e.target.value)}/>
           <TextField id="outlined-date" label="DOB" type="date"
          onChange={(e)=>setDob(e.target.value)} InputLabelProps={{
            shrink: true,
          }}/>
<Button variant="contained"
onClick={()=>{
  const newUser={
      name:uname,
      address:uaddr,
      profile_pic:uprofile,
      dob:udob
    }
    fetch(`${API}/user/`,{
      method:"POST",
      body:JSON.stringify(newUser),
      headers:{"Content-Type": "application/json"}
      
    }).then((data)=>{data.json()})
    .then(()=>navigate("/displayuser"))
  
   }
  }

>Add</Button>

        </form>
      </Box>
    </div>
  );
}

function DisplayUser() {

  const navigate= useNavigate();
  const getUsers=()=>{
    fetch(`${API}/user`,{
      method:"GET"
    })
    .then((respone)=>respone.json())
    .then(data=>{setUserlist(data)})

  }
   const [userlist, setUserlist] = useState([]);
  useEffect(()=>{getUsers()},[])

  return <div>
    
    <h1>These are the Users</h1>
    <div className="displayContainer">
      
    {userlist.map((m, index) => (
         
         <SingleUserDisplay evuser={m} id={m.id} 
          deleteButton={<IconButton onClick={()=>{
            fetch(`${API}/user/${m.id}`,{
              method:"DELETE"
            }).then(()=>getUsers())
          }}> <DeleteIcon color="error"/> </IconButton> }

        // edit icon
        editButton={<IconButton 
        onClick={()=>{navigate(`/user/edit/${m.id}`)}}> <EditIcon color="primary"/> </IconButton> }
/>
        ))}
        
    </div>

  </div>;
}


function SingleUserDisplay(probs){
return(
  <div>
   
    <img
        className="propic"
        src={probs.evuser.profile_pic}
        alt={probs.evuser.name}
      />
      <div>
      {probs.evuser.name} {probs.id}
      {probs.editButton}
      {probs.deleteButton}
      </div>
  </div>
)

}


function EditUser(){
  const navigate= useNavigate();
  

    const { id } = useParams();
    // const [userdetails,setUser]=useState(null);

    const [uname, setName] = useState("");
    const [uaddr,setAddr]=useState("");
    const [uprofile, setProfile] = useState("");
     const [udob, setDob] = useState(new Date());
    
    useEffect(()=>{
      fetch(`${API}/user/${id}`,
      {method:"GET"})
      .then((data)=>data.json())
      .then((mv) =>{
    console.log(mv)
    setName(mv.name)
    setAddr(mv.address)
    setProfile(mv.profile_pic);
    setDob(mv.dob)
  })
    },[])
   
  return(
    <div>
      This is Edit Page
      {uname}
      <div>
          <TextField id="outlined-search" label= "Enter Name" type="search"
            value={uname} onChange={(e) => setName(e.target.value)}
          />
          <TextField id="outlined-search" label="Enter Address" type="search"
           value={uaddr} onChange={(e) => setAddr(e.target.value)}
          />
          
          <TextField id="outlined-search" label="Profile pic address" type="search" 
          value={uprofile} onChange={(e) => setProfile(e.target.value)}
           />
           <TextField id="outlined-date" label="DOB" type="date"
          value={udob} onChange={(e) => setDob(e.target.value)}
        />
<Button variant="contained"
onClick={()=>{
  const updatedUser={
    name:uname,
    address:uaddr,
    profile_pic:uprofile,
    dob:udob
  }
  fetch(`${API}/user/${id}`,{
    method:"PUT",
    body:JSON.stringify(updatedUser),
    headers:{"Content-Type": "application/json"}
    
  }).then((data)=>{data.json()})
  .then(()=>navigate("/displayuser"))

 }
}
>Update</Button>


        </div>
    </div>
  )
}