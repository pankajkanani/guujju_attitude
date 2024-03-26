import "./style.css";
import domtoimage from "dom-to-image";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import React, { useState, useEffect, useRef } from "react";

//const url = "https://twitter-api45.p.rapidapi.com/timeline.php?screenname=";
const url ="https://pankajkanani.github.io/API/data.json"

export default function App() {
  const downloadRef = useRef();

  const handleDownloadImage = () => {
    const targetEl = downloadRef.current;
    domtoimage.toJpeg(targetEl, { quality: 0.99 }).then((dataUrl) => {
      let link = document.createElement("a");
      link.download = "gujjujokes.jpeg";
      link.href = dataUrl;
      link.click();
    });
  };
  const whatsApp = () => {
    const shareurl = 'whatsapp://send?text='+quotes.value.replace(/\n/g, '%0A');
      window.open(shareurl, "_blank");
  };
  const [numbers, setNumbers] = useState(1);
  const [quotes, setQuotes] = useState({
    "key": 1,
    "value": "વ્હાલા વિદ્યાર્થીઓ,\n\nડરશો નહિ, બિલકુલ ગભરાશો નહિ \nબોર્ડની પરીક્ષા એકદમ સહેલી છે ,\nમે પોતે પણ ચાર વાર આપી છે\n  \n     😂😂😂😂😂"
    });
  const [quotesdata, setQuotesdata] = useState([]);
  //Fetch Quotes from API
  const getQuote = () => {
    fetch(url,)
      .then((response) => response.json())
      .then((data) =>
      setQuotesdata(
          data
        )
      );
  };

  //data[Math.floor(Math.random() * data.length) + 1]
  useEffect(() => {
    getQuote();
  }, []);

  const getNewQuote = () => {
    setNumbers(Math.floor(Math.random() * quotesdata.length) + 1);
    setQuotes(quotesdata[numbers]);
  };
  
  const getNextQuote = () => {
    setNumbers(numbers + 1);
    setQuotes(quotesdata[numbers]);
  };
  const getPrevQuote = () => {
    setNumbers(numbers - 1);
    setQuotes(quotesdata[numbers]);
  };
  const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quotes.value.replace(/\n/g, '%0A')} - @gujju_attitude`;
    window.open(twitterUrl, "_blank");
  };

  const getnumber = (e) => {
    console.log(Math.floor(quotesdata.length));
    if(Math.floor(quotesdata.length) + 1 < e.target.value){
      setNumbers(0);  
    }else{
      setNumbers(Number(e.target.value))
    }
  }

  const { value, key } = quotes;
  //value = value.replace(/\r\n/g, "<br />");
  
  return (
    <div>
      <div className="container" ref={downloadRef}>
        <div className="box-centerside">
          <div className="textcontent">
            <div className="text">
              <p>{value}</p>
            </div>
            <div className="author">
              <h5 onClick={tweetQuote}>@gujju_attitude</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="buttons">
        <div className="text">
          <input type="text" className="form-control" value={numbers} onChange={getnumber}></input>
          <input type="text" className="form-control" readOnly value={Math.floor(quotesdata.length)}></input>
        </div>
        <div class="d-flex justify-content-between">
          <button className="newqoutes" disabled={numbers < 1 } onClick={getPrevQuote}><i className="fa fa-backward" aria-hidden="true"></i></button>
          <button className="newqoutes" disabled={Math.floor(quotesdata.length) < numbers+1} onClick={getNextQuote}><i className="fa fa-fast-forward" aria-hidden="true"></i></button>
          <button className="newqoutes" onClick={getNewQuote}><i className="fa fa-random" aria-hidden="true"></i></button>
          <button className="download" onClick={handleDownloadImage}><i className="fa fa-download" aria-hidden="true"></i></button>
        </div>
        {/* <button className="downloadpng" onClick={() => exportComponentAsPNG(downloadRef)} >Convert To PNG</button> */}
        <button className="downloadpng" onClick={whatsApp} >Share on WhatsApp</button>
        <button className="downloadpng" onClick={tweetQuote} >Share on Twitter</button>
      </div>
    </div>
  );
}
