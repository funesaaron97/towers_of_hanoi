import React, { useState} from 'react';
import './App.css';
import range from './rangefunc';
import rules from './ruleset/hanoit.pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faLayerGroup, faFileAlt } from '@fortawesome/free-solid-svg-icons';

function App() {

  //First we must initialize the conditions necessary for the game
  let number_of_disk = 3;
  let num_optimal_moves = 0;

  let l_disks  = [];
  let m_disks = [];
  let r_disks = [];
  const letters = ['Left', 'Middle' , 'Right' ]

  //Then we create different useState variables for the those conditions that we will manipulate in the DOM
  const [numdisks, setNumdisks] = useState();
  const [optimalmoves, setOptimalMoves] = useState();
  const [ltower, setLtower] = useState([]);
  const [mtower, setMtower] = useState([]);
  const [rtower, setRtower] = useState([]);
  const [ltostack, setLtostack] = useState();
  const [mtostack, setMtostack] = useState();
  const [rtostack, setRtostack] = useState();
  const [totalmoves, setTotalmoves] = useState(0);

  //Write a function that checks for win condition
  const winCondition = () => {
    if (r_disks.length === numdisks || rtower.length === numdisks){
      alert("Congrats you have beaten the game!");
      optimalCondition();
    }
  }

  //Write another functions that checks to see if the user has won the game in the optimal number of moves
  const optimalCondition = () =>{
    if (totalmoves + 1 === optimalmoves) {
      alert("Congrats You Beaten the Game in the optimal amount of moves! Try a different amount of disks! Press F5 to reset the game")
    } else if (totalmoves + 1 > optimalmoves) {
      alert("You can beat the game in less moves! If you want to try again, press F5 to reset the game!")
    }
  }

  //Write a function that setups the game conditions and simultaneously updates the state of the conditions
  const handleNumdisks = (value) => {
    number_of_disk = value;
    var total_disk = range(number_of_disk, 0 , -1);
    for(var i of total_disk){
      l_disks.push(i);
    };
    num_optimal_moves = (2**number_of_disk - 1);
    alert("The fastest you can solve this game is in " + num_optimal_moves.toString() + " moves!");
    const diskbuttons = document.getElementById("buttons");
    setNumdisks(number_of_disk);
    setOptimalMoves(num_optimal_moves);
    setLtower(l_disks);
    diskbuttons.remove();
    setLtostack(letters[1]);
    setMtostack(letters[2]);
    setRtostack(letters[0]);
  }

  //Write functions that updates the state for the toStack variables
  const handleLarrows = () =>{
    if (ltostack === letters[1]) {
      setLtostack(letters[2]);
      return;
    } else if (ltostack === letters[2]){
      setLtostack(letters[1]);
      return;
    };
  }

  const handleMarrows = () => {

    if (mtostack === letters[2]) {
      setMtostack(letters[0]);
      return;
    } else if (mtostack === letters[0]){
      setMtostack(letters[2]);
      return;
    };

  }


  const handleRarrows = () => {

    if (rtostack === letters[0]) {
      setRtostack(letters[1]);
      return;
    } else if (rtostack === letters[1]){
      setRtostack(letters[0]);
      return;
    };
  }

  /*Write functions that handle the different necessary conditions for the push/pop methods to be imployed for each stack and also updates the state
  if those conditions are satisfied*/
  const handleLpush = () => {

    if (ltower.length === 0) {
      alert("Invalid Move!")
      return
    }
    
    if (ltostack === letters[1]) {

      l_disks = ltower;
      m_disks = mtower;
    
      var l_peek = l_disks.length - 1
      var m_peek = m_disks.length - 1

      if (m_disks.length === 0 || l_disks[l_peek] < m_disks[m_peek] ){
        m_disks.push(l_disks.pop());
        setLtower(l_disks);
        setMtower(m_disks);
        setTotalmoves(totalmoves + 1);
        winCondition();
        return
      } else {
        alert("Invalid Move!");
      }
    }

    if (ltostack === letters[2]) {

      l_disks = ltower;
      r_disks = rtower;
    
      var l_peek = l_disks.length - 1
      var r_peek = r_disks.length - 1

      if (r_disks.length === 0 || l_disks[l_peek] < r_disks[r_peek] ){
        r_disks.push(l_disks.pop());
        setLtower(l_disks);
        setRtower(r_disks);
        setTotalmoves(totalmoves + 1);
        winCondition();
        return
      } else {
        alert("Invalid Move!");
      }
    }

  }


  const handleMpush = () => {

    if (mtower.length === 0) {
      alert("Invalid Move!")
      return
    }
    
    if (mtostack === letters[2]) {

      m_disks = mtower;
      r_disks = rtower;
      
      var m_peek = m_disks.length - 1
      var r_peek = r_disks.length - 1

      if (r_disks.length === 0 || m_disks[m_peek] < r_disks[r_peek] ){
        r_disks.push(m_disks.pop());
        setMtower(m_disks);
        setRtower(r_disks);
        setTotalmoves(totalmoves + 1);
        winCondition();
        return
      } else{
        alert("Invalid Move!");
      }
    }

    if (mtostack === letters[0]) {

      l_disks = ltower;
      m_disks = mtower;

      var l_peek = l_disks.length - 1
      var m_peek = m_disks.length - 1

      if (l_disks.length === 0 || m_disks[m_peek] < l_disks[l_peek] ){
        l_disks.push(m_disks.pop());
        setLtower(l_disks);
        setMtower(m_disks);
        setTotalmoves(totalmoves + 1);
        winCondition();
        return
      } else {
        alert("Invalid Move!");
      }
    }

    winCondition();
  }

  const handleRpush = () => {

    if (rtower.length === 0) {
      alert("Invalid Move!")
      return
    }
    
    if (rtostack === letters[0]) {

      l_disks = ltower;
      r_disks = rtower;
      
      var l_peek = l_disks.length - 1
      var r_peek = r_disks.length - 1

      if (l_disks.length === 0 || r_disks[r_peek] < l_disks[l_peek] ){
        l_disks.push(r_disks.pop());
        setLtower(l_disks);
        setRtower(r_disks);
        setTotalmoves(totalmoves + 1);
        winCondition();
        return
      } else {
        alert("Invalid Move!");
      }
    }

    if (rtostack === letters[1]) {

      r_disks = rtower;
      m_disks = mtower;

      var r_peek = r_disks.length - 1
      var m_peek = m_disks.length - 1

      if (m_disks.length === 0 || r_disks[r_peek] < m_disks[m_peek] ){
        m_disks.push(r_disks.pop());
        setRtower(r_disks);
        setMtower(m_disks);
        setTotalmoves(totalmoves + 1);
        winCondition();
        return;
      } else {
        alert("Invalid Move!");
      }
    }
    
  }


  //Now we write the HTML/JSX to structure the game on the DOM

  return(
    <div className='background'>
      <div className= "game-app">
        <div className = "stacks-container">
          <h2 className='title'>Towers of Hanoi <FontAwesomeIcon icon ={faLayerGroup}/></h2>
          <div className='rules'>
            <a href ={rules}> <em>Rules <FontAwesomeIcon icon ={faFileAlt}/></em></a>
          </div>
          <div className="num-disks">
              <div id ="buttons">
                <p> Choose the number of disks you want!</p>
                <div className='buttons'>
                  <button onClick={() => handleNumdisks(3)}>3</button>
                  <button onClick={() => handleNumdisks(4)}>4</button>
                  <button onClick={() => handleNumdisks(5)}>5</button>
                  <button onClick={() => handleNumdisks(6)}>6</button>
                  <button onClick={() => handleNumdisks(7)}>7</button>
                  <button onClick={() => handleNumdisks(8)}>8</button>
                  <button onClick={() => handleNumdisks(9)}>9</button>
                  <button onClick={() => handleNumdisks(10)}>10</button>
                </div>
              </div>
          </div>

          <div className = "stack-row">
            <div className = "left">
            {ltower.slice(0).reverse().map((ldisk, index) =>{
              return(<div className = "disk" key ={index}>
                <span>{ldisk}</span>
              </div>)
            }) }
            <span className='letters'>Move to: <span className='transfer'>{ltostack}</span></span>
            <div className='bottom'>
              <button className = 'arrow' onClick={() => handleLarrows()}> ← </button>
              <button className = 'arrow' onClick={() => handleLarrows()}> → </button>
              <div className='pushcont'>
                <button className='push' onClick = {() => handleLpush()}> Push </button>
              </div>
            </div>
            </div>
            <div className= "middle">
            {mtower.slice(0).reverse().map((mdisk, index) =>{
              return(<div className = "disk" key ={index}>
                <span>{mdisk}</span>
              </div>)
            }) }
            <span className='letters'>Move to: <span className='transfer'>{mtostack}</span></span>
            <div className='bottom'>
              <button className = 'arrow' onClick={() => handleMarrows()}> ← </button>
              <button className = 'arrow' onClick={() => handleMarrows()}> → </button>
              <div className='pushcont'>
                <button className='push' onClick = {() => handleMpush()}> Push </button>
              </div>
            </div>
            </div>
            <div className = "right">
            {rtower.slice(0).reverse().map((rdisk, index) =>{
              return(<div className = "disk"key ={index}>
                <span>{rdisk}</span>
              </div>)
            }) }
            <span className='letters'>Move to: <span className='transfer'>{rtostack}</span></span>
            <div className='bottom'>
              <button className = 'arrow' onClick={() => handleRarrows()}> ← </button>
              <button className = 'arrow' onClick={() => handleRarrows()}> → </button>
              <div className='pushcont'>
                <button className='push' onClick = {() => handleRpush()}> Push </button>
              </div>
            </div>
            </div>
          </div>
          <div className='moves'>
              <span className='total'> Total Moves = <span className='tmoves'>{totalmoves}</span></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
