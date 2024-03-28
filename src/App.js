import "./style.css";
import domtoimage from "dom-to-image";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import React, { useState, useEffect, useRef } from "react";

//const url = "https://twitter-api45.p.rapidapi.com/timeline.php?screenname=";
const url ="https://script.googleusercontent.com/macros/echo?user_content_key=OLiUxvgM17a1TfmKiv4jBgRdRcz3IuEJoYTiKvgHLW4XLg5rQDGFylVicjZUhT9Y97jf-PV2sVUk5_degFUAykfM3YlMU3x5m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMUTbFgPU8T-In7C3-XsVuj2YZ1EwrHd2klV-2K1_3duuJkqZWbludKC2JxeWz8N2m-Sax4tjv_pW0xVcxBEuKCISzZsL4OODNz9Jw9Md8uu&lib=Mp7hoo_qWh8hmkt1EIAj6sKk-mkeIon-b"

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
  const [colors, setColors] = useState([
    {"background":"#000000", "color":"#FFFFFF"}, 
    {"background":"#2F3C7E", "color":"#FBEAEB"}, 
    {"background":"#101820", "color":"#FEE715"}, 
    {"background":"#990011", "color":"#FCF6F5"}, 
    {"background":"#00203FFF", "color":"#ADEFD1FF"}, 
    {"background":"#00246B", "color":"#CADCFC"}, 
    {"background":"#101820FF", "color":"#FEE715FF"}, 
    {"background":"#0063B2FF", "color":"#9CC3D5FF"},
    {"background":"#2BAE66FF", "color":"#FCF6F5FF"},
    {"background":"#990011FF", "color":"#FCF6F5FF"},
  ]);
  const [colournumber, setColournumber] = useState(0);
  let [hashtag, setHashtag] = useState("gujju_attitude");
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
    let hashvalue = "";
    if(hashtag){
      hashvalue = '%0A%0A&hashtags='+hashtag;
    }
    console.log(hashvalue);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quotes.value.replace(/\n/g, '%0A')} ${hashvalue}`;
    console.log(twitterUrl);
    window.open(twitterUrl, "_blank");
  };
  let gethashtag = (e) => {
    setHashtag((e.target.value))
  }
  let handleFruitChange = (e) => {
    setColournumber(e.target.value)
  }
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
      <div className="container" style={{background:colors[colournumber].background,  border: '15px double '+colors[colournumber].color}}  ref={downloadRef}>
        <div className="box-centerside">
          <div className="textcontent">
            <div className="text">
              <p style={{color:colors[colournumber].color}}>{value}</p>
            </div>
            <div className="author">
              <h5 style={{color:colors[colournumber].color}} onClick={tweetQuote}>@gujju_attitude</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="buttons">
      <div className=" d-flex justify-content-between">
            <div className="form-group col-6">
                <input type="text" className="form-control input-group-lg reg_name" value={numbers} onChange={getnumber}></input>
            </div>
            <div className="form-group col-6">
                <input type="text" className="form-control input-group-lg reg_name" readOnly value={Math.floor(quotesdata.length)}></input>
            </div>
        </div>
        <div className="form-group col-12">
            <input type="text" className="form-control input-group-lg reg_name" onChange={gethashtag}  value={hashtag}></input>
        </div>
        <div className="form-group col-12">
        <select className="form-select form-select-lg mb-3" onChange={handleFruitChange}> 
          {colors.map((color, i) => <option value={i}>{color.background}, {color.color}</option>)}
        </select>
        </div>
        
        <div className="d-flex justify-content-between">
          <button className="newqoutes" disabled={numbers < 1 } onClick={getPrevQuote}><i className="fa fa-backward" aria-hidden="true"></i></button>
          <button className="newqoutes" disabled={Math.floor(quotesdata.length) < numbers+1} onClick={getNextQuote}><i className="fa fa-fast-forward" aria-hidden="true"></i></button>
          <button className="newqoutes" onClick={getNewQuote}><i className="fa fa-random" aria-hidden="true"></i></button>
        </div>
        <div className="d-flex justify-content-between">
          <button className="downloadpng" onClick={whatsApp} ><i className="fab fa-whatsapp fa-fw fa-xl"></i></button>
          <button className="downloadpng" onClick={tweetQuote} ><i className="fa-brands fa-x-twitter"></i></button>
          <button className="download" onClick={handleDownloadImage}><i className="fa fa-download" aria-hidden="true"></i></button>
          {/* <button className="downloadpng" onClick={() => exportComponentAsPNG(downloadRef)} >Convert To PNG</button> */}
        </div>
        
      </div>
    </div>
  );
}
