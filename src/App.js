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
    domtoimage.toJpeg(targetEl, { quality: 0.95 }).then((dataUrl) => {
      let link = document.createElement("a");
      link.download = "gujjujokes.jpeg";
      link.href = dataUrl;
      link.click();
    });
  };
  const [quotes, setQuotes] = useState([{
    "key": 3,
    "value": "જે દિવસે પત્ની જોડે માથાકૂટ થાય તે દિવસે કસ્ટમર કેર વાળી જોડે વાત કરી લેવી,\n\nમાન સન્માન પાછા મળ્યા નો આનંદ થાશે...!!\n\n            😂😂😂😂😂😂"
    }]);
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
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quotes.value} - @gujju_attitude`;
    window.open(twitterUrl, "_blank");
  };

  const { value, key } = quotes;
  
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
