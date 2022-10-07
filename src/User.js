import React from "react";

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { Routes, Route, Link, useNavigate} from "react-router-dom";

export default function User() {
    let navigate=useNavigate();
  return (
    <div>
      Hello welcome userjs
      <Link to="./adduser"> Add user</Link>
      <AppBar position="static">
        <Button color="inherit" onClick={() => navigate("/adduser")}>
          AddUser
        </Button>
        <Button color="inherit" onClick={() => navigate("/displayuser")}>
          Display Users
        </Button>
        <Button color="inherit" onClick={() => navigate("/movies")}>
          Movies
        </Button>
      </AppBar>
      <Routes>
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/displayuser" element={<DisplayUser />} />
      </Routes>
    </div>
  );
}

function AddUser() {
  return <div>This is AddUser</div>;
}

function DisplayUser() {
  return <div>This is Display User</div>;
}
