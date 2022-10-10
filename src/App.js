// import logo from './logo.svg';
// import { useState } from 'react';
import User from './User';
 import './App.css';
/*******************Start Counter******************************** */
// import Counti from './counti';
/*************************End Counter********************************************* */



function App() {
  /*******************Start Counter******************************** */
  // const [count, setCount]=useState(0);
  // const inhandler=()=>{
  //   setCount(count+1);
  // }
  // const Dehandler=()=>{
  //   setCount(count-1);
  // }
/*************************End Counter********************************************* */
  return (
    <div className="App">
      {/* /****************** Start counter **********************/ }
      {/* {count}
     <Counti  count={count} handler={inhandler}/>
     {count%2==0 ? (<button onClick={Dehandler}>Decrement</button>):('')} */}
     {/* /**********End Counter********************************************** */ }

<User />
    
    </div>
  );
}

export default App;
