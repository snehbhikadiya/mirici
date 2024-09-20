import React,{useState} from "react";

export default function Textform(props) {
  const [text,setText]=useState('');

  // for uppercase
  function uppercaseclick(){
    const newtext=text.toUpperCase();
    setText(newtext);
    props.showalert("to UPPERCASE converted successfully","success");
  }

  //for lowercase
  const lowercaseclick=()=>{
    const newtext=text.toLowerCase();
    setText(newtext);
    props.showalert("to lowercase converted successfully","success");
  }

  //trim the space
  function trimclick(){
      const newtext=text.trim();
      setText(newtext);
      props.showalert("to space remove successfully","success");
  }

  // removeallspaceclick
  const removeallspaceclick=()=>{
    const newtext=text.replace(/\s+/g,'');
    setText(newtext);
    props.showalert("all space remove successfully","success");
  }
  //for showing value
  const convertouppercase=(e)=>{
    setText(e.target.value);
  }
  return (
    <>
  <div className="container">
  <div className="my-3">
      <div className="mb-3 " style={{color:props.mode==="light"?"black":props.skybluemode===  "skyblue"?"white":"black"}} >
        <h2 >{props.heading}</h2>
        <textarea
        value={text}
        onChange={convertouppercase}
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="9"
          style={{backgroundColor:props.mode==="light"?" ":"grey",color:props.mode==="light"?"black":props.skybluemode===  "skyblue"?"white":"black"}}
          placeholder="enter text here...."
        ></textarea>
          <div id="lengthandcharcode">
          <h1>{`length:${text.length}`}</h1>
          <h1>{`charCode:${text?text.charCodeAt():0}`}</h1>
          <h1>{`word:${text.split(/\s+/).filter(word=>word.length>0).length}`}</h1>
          </div>
       <button type="button" className="btn btn-primary my-3 mx-3" onClick={uppercaseclick}>UPPER-CASE</button>
       <button type="button" className="btn btn-primary my-3 mx-3" onClick={lowercaseclick}>lower-case</button>
       <button type="button" className="btn btn-primary my-3 mx-3" onClick={trimclick}>trim</button>
       <button type="button" className="btn btn-primary my-3 mx-3" onClick={removeallspaceclick}>Remove all space</button>
      </div>
    </div>
  </div>

  <div className="container" style={{color:props.mode==="light"?"black":props.skybluemode === "skyblue" ? "white" : "black"}} >
    <h2>preview:</h2>
    <p>{text===""?"there is nothing":text}</p>
  </div>
  </>
  );
}
