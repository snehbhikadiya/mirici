import About from './components/About';
import Navbar from './components/Navbar';
import Textform from './components/Textform';
import React,{useState} from 'react'
import './hari.css';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [mode,setmode]=useState('light');
  const [skybluemode,setskybluemode]=useState(mode);
  const [alert,setalert]=useState(null);

  const showalert=(message,type)=>{
    setalert({
       msg:message, //msg this is only diffine
      type:type  //type is only diffine
    })
    setTimeout(() => {
      setalert(null);
    }, 1500);
  }

  const changcolor=()=>{
    if(mode==="light"){ 
      setmode("dark");
      document.body.style.backgroundColor='grey';
      document.title="dark mode on"
      showalert("dark mode change successfully","success");
    }else{  
      setmode("light");
      document.body.style.backgroundColor="white";
      document.title="dark mode off"
      showalert("light mode change successfully","success");
    }
  }

  const changebluecolor=()=>{
      if(skybluemode==="light" || skybluemode==="dark" ){
        document.body.style.backgroundColor="skyblue";
        setskybluemode("skyblue");
        showalert("skyblue mode change successfully","success");
      }else{
        setskybluemode("light");     
        document.body.style.backgroundColor="white";
        showalert("light mode change successfully","success");
      }
      
  }
  return (
   <>
   <Router>
   <Navbar logo="Hari" Gallery="Gallery" Contact="Contact" About="About" alert={alert} mode={mode} changcolor={changcolor} skybluemode={skybluemode} changebluecolor={changebluecolor} />
   <Alert alert={alert}/>

{/* //exact is good things other wise many types it do mismatch */}
    <Routes>
      <Route  exact path='/' element={   <Textform heading="Play with your text" mode={mode} showalert={showalert} skybluemode={skybluemode}/>}/>       
        <Route exact path='/about' element={<About/>}/>           
        </Routes> 
    </Router>
   </>
  );
}

export default App;
