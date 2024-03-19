import "./style.css";
import domtoimage from "dom-to-image";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import React, { useState, useEffect, useRef } from "react";

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
    setQuotes(quotesdata[Math.floor(Math.random() * quotesdata.length) + 1]);
  };
  
  const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quotes.value.replace(/\n/g, '%0A')} - @gujju_attitude`;
    window.open(twitterUrl, "_blank");
  };

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
        <button className="newqoutes" onClick={getNewQuote}>New Quote</button>
        <button className="download" onClick={handleDownloadImage}>Download</button>
        <button className="downloadpng" onClick={() => exportComponentAsPNG(downloadRef)} >Convert To PNG</button>
      </div>
    </div>
  );
}
