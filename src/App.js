import "./style.css";
import domtoimage from "dom-to-image";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import React, { useState, useEffect, useRef } from "react";

//const url = "https://twitter-api45.p.rapidapi.com/timeline.php?screenname=";
const url ="https://sheetdb.io/api/v1/3jgl0btt16g3a/search?index="
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5c0cd551e1msh9d19075f87da38cp1e637ajsn2740807cb2ef",
    "X-RapidAPI-Host": "twitter-api45.p.rapidapi.com",
  },
};
export default function App() {
  const downloadRef = useRef();

  const handleDownloadImage = () => {
    const targetEl = downloadRef.current;
    domtoimage.toJpeg(targetEl, { quality: 0.95 }).then((dataUrl) => {
      let link = document.createElement("a");
      link.download = "gujjujokes.jpeg";
      link.href = dataUrl;
      link.click();
    });
  };
  let username = "ckey49";
  const [quotes, setQuotes] = useState([]);

  //Fetch Quotes from API
  const getQuote = () => {
    const number = Math.floor(Math.random() * 115) + 1;
    fetch(url + number, options)
      .then((response) => response.json())
      .then((data) =>
        setQuotes(
          data[0]
        )
      );
  };

  useEffect(() => {
    getQuote();
  }, []);

  const getNewQuote = () => {
    getQuote();
  };

  const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quotes.Text} - @gujju_attitude`;
    window.open(twitterUrl, "_blank");
  };

  const { Text, index } = quotes;
  
  return (
    <div>
      <div className="container" ref={downloadRef}>
        <div className="box-centerside">
          <div className="text">
            <p>{Text}</p>
          </div>
          <div className="author">
            <h5 onClick={tweetQuote}>@gujju_attitude</h5>
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
