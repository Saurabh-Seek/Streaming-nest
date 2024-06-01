"use client";

import { useRef } from "react";

export default function Home() {
  const streemRef = useRef(null as any);
  const videoRef = useRef(null as any);
  //------------------------------
  const webcamRef = useRef(null as any)

  const startRec = async () => {
    const displayStreem = await window.navigator.mediaDevices.getDisplayMedia({
      video: true,
    });

//--------------------------------------------------------
const webcamStream = await window.navigator.mediaDevices.getUserMedia({
  video:true
})



    const audioStream = await window.navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    streemRef.current = new MediaStream([
      ...displayStreem.getTracks(),
      ...audioStream.getTracks(),
    ]);
    videoRef.current.srcObject = streemRef.current;
    //  videoRef.current.srcObject = streemRef.current,
    ///---------------------------
    webcamRef.current.srcObject = webcamStream;

    videoRef.current.style.display = "blcok";
    webcamRef.current.style.display = "block";


//-------------------------

    const mediaChunk:Array<Blob>=[];
    const mediaRecorder = new MediaRecorder(streemRef.current)
    mediaRecorder.ondataavailable = (Event) =>{
      mediaChunk.push(Event.data)
    }
    mediaRecorder.onstop = () =>{
      const blob = new Blob(mediaChunk, {type:"video/webm"})
      const urlObj = URL.createObjectURL(blob)
      debugger
      console.log("urlobj",urlObj);
      window.open(urlObj)
      
    }
    mediaRecorder.start()



  };

  const stopRec = () => {
    streemRef.current.getTracks().forEach((track: any) => track.stop());
    videoRef.current.style.display = "none";
    webcamRef.current.style.display = "none";
  };
  return (
    <div style={{height:"100px"}}>
      <button onClick={startRec}>Start</button>
      <button onClick={stopRec}>Stop</button>
      <div style={{ position: "relative" , width:"100%",height:"40%"}}>
        <video ref={videoRef} autoPlay style={{ width: "100%" }} />
        <video
          ref={webcamRef}
          autoPlay
          muted
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "200px",
            height: "200px",
            border: "4px solid white",
            // backgroundColor:"black",
            borderRadius: "50%",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          }}
        />
      </div>
    </div>
  );
}
