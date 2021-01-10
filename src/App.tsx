import React, {useCallback, useRef, useState} from 'react';

type cutTimeType = {
    ms:number,
    s:number,
    m:number,
    h:number
}

function App() {
    const [hours, setHours] = useState<number>(0)
    const [mins, setMins] = useState<number>(0)
    const [seconds, setSeconds] = useState<number>(0)
    const [mSeconds, setMSeconds] = useState<number>(0)
    const [isStarted, setIsStarted] = useState(false)
    const [rounds, setRounds] = useState<cutTimeType[]>([])
    const i = useRef<any>(null)

    const start =  useCallback(() =>{
        i.current = setInterval(()=>{
            setMSeconds(prevState => prevState+1)
        },10)
        setIsStarted(true)
    }, [])
    const stop = useCallback(()=>{
        clearInterval(i.current)
        setIsStarted(false)
    }, [])
    const clear = () => {
        setIsStarted(false)
        setMSeconds(0)
        setSeconds(0)
        setMins(0)
        setHours(0)
        setRounds([])
    }
    const round = () => {
        const curTime = {
            ms:mSeconds,
            s:seconds,
            m:mins,
            h:hours
        }
        setRounds([...rounds, curTime])
    }
    if(mSeconds === 100) {setMSeconds(prev=>0);setSeconds(prevState => prevState+1)}
    if(seconds === 60) {setSeconds(prev=>0);setMins(prevState => prevState+1)}
    if(mins === 60) {setMins(prev=>0);setHours(prevState => prevState+1)}
  return (
    <div className={"container"} >
      <h1>
          {hours.toString().length ===1? `0${hours}`:hours }
          :{mins.toString().length ===1? `0${mins}`:mins }
          :{seconds.toString().length ===1? `0${seconds}`:seconds }
          :{mSeconds.toString().length ===1? `0${mSeconds}`:mSeconds }
      </h1>
        {isStarted
            ?<div>
                <button onClick={()=>round()} className={"btn btn-info"}>Round</button>
                <button onClick={()=>stop()} className={"btn btn-danger"}>Stop</button>
            </div>
            :<div>
                <button onClick={()=>start()} className={"btn btn-info"}>Start</button>
                <button onClick={()=>clear()} className={"btn btn-danger"}>Clear</button>
            </div>
        }
        {rounds.map((e, index:number)=><h3 key={index}>
            {index+1}. {e.h}:{e.m}:{e.s}:{e.ms}
        </h3>)}
    </div>
  );
}

export default App;
