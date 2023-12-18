import React, { useState } from 'react'

const Test = () => {
    const[day,setDay]=useState("");
    const[game,setGame]=useState("");
    const options=["cricket","football","hockey"];
    const days=["weekdays","weekends"];
    
    const handleDay=(e)=>{
        
        setDay(e.target.value);
        console.log(day)
    }
    const handleGame=(eve)=>{
      
        setGame(eve.target.value)

    }

  return (
    <div>
        <h1>WHAT DOES YOULL PLAY</h1>
        {
            options.map((values,index)=>{
                return(
                    <label key={index}>
                    <input type='radio'name='sport'value={values} onChange={handleGame} />
                    {values}<br/>
                    </label>
                )
            })
        }
        <div></div>
        <h1>WHEN YOU'LL PLAY {game}</h1>
        {
            days.map((day,ind)=>{
                return(
                    <label key={ind}>
                        <input type='radio' name='week' value={day} onChange={handleDay} />
                        {day}<br/>
                    </label>
                )
            })
        }
        <h1>I'll Play {game} on {day}</h1>
    </div>

  )
}

export default Test