import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useState } from "react";

function App() {
  var [ currInst, setCurrInst ] = useState(0);
  var [ date, setDate ] = useState(new Date());
  var [ dietText, setDietText ] = useState(["","","","","","","","",""]);
  var [ nameText, setNameText ] = useState("");
  const timeText = ["Early Morning","Breakfast","Mid Day","Lunch","","","Evening Tea","Dinner","Before Bed"];
  const timeTime = ["7:00 am - 8:00 am","9:00 am - 10:00 am","12:00 noon","1:00 pm - 2:00 pm","3:00 pm","4:00 pm","5:00 pm - 6:00 pm","8:00 pm","1 hour before bed"];
  var [finalText, setFinalText] = useState("");
  var [clipboardText, setClipboardText] = useState("");
  const generateFinalText = () => {
    const nameSplChars = ["🄰","🄱","🄲","🄳","🄴","🄵","🄶","🄷","🄸","🄹","🄺","🄻","🄼","🄽","🄾","🄿","🅀","🅁","🅂","🅃","🅄","🅅","🅆","🅇","🅈","🅉"];
    const months = ["ᴊᴀɴ","ꜰᴇʙ","ᴍᴀʀᴄʜ","ᴀᴘʀɪʟ","ᴍᴀʏ","ᴊᴜɴᴇ","ᴊᴜʟʏ","ᴀᴜɢ","ꜱᴇᴘᴛ","ᴏᴄᴛ","ɴᴏᴠ","ᴅᴇᴄ"];
    const days = ["ꜱᴜɴᴅᴀʏ", "ᴍᴏɴᴅᴀʏ", "ᴛᴜᴇꜱᴅᴀʏ", "ᴡᴇᴅɴᴇꜱᴅᴀʏ", "ᴛʜᴜʀꜱᴅᴀʏ", "ꜰʀɪᴅᴀʏ", "ꜱᴀᴛᴜʀᴅᴀʏ"];
    const splTimeText = ["ᴇᴀʀʟʏ ᴍᴏʀɴɪɴɢ","ʙʀᴇᴀᴋꜰᴀꜱᴛ","ᴍɪᴅ ᴅᴀʏ","ʟᴜɴᴄʜ","","","ᴇᴠᴇɴɪɴɢ ᴛᴇᴀ","ᴅɪɴɴᴇʀ","ʙᴇꜰᴏʀᴇ ʙᴇᴅ"];
    const splBreakLine = ["✿🟠✿🟠✿🟠✿🟠✿🟠✿","✿🟡✿🟡✿🟡✿🟡✿🟡✿","✿🟢✿🟢✿🟢✿🟢✿🟢✿",
                          "✿🔵✿🔵✿🔵✿🔵✿🔵✿","✿🟣✿🟣✿🟣✿🟣✿🟣✿","✿⚫✿⚫✿⚫✿⚫✿⚫✿",
                          "✿⚪✿⚪✿⚪✿⚪✿⚪✿","✿🟤✿🟤✿🟤✿🟤✿🟤✿","✿🔴✿🔴✿🔴✿🔴✿🔴✿"]

    var myName = "";
    nameText.split("").forEach((char) => {
      if(char === ' ') myName += " ";
      else myName += nameSplChars[char.toLowerCase().charCodeAt(0)-97];
    });
    finalText = myName + "\n";
    clipboardText = "*" + myName + "*\n";
    finalText += days[date.getDay()] + " ᴅɪᴇᴛ ᴘʟᴀɴ ["+ date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() +"]\n\n";
    clipboardText += "*" + days[date.getDay()] + " ᴅɪᴇᴛ ᴘʟᴀɴ* _["+ date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() +"]_\n\n";
    
    timeText.forEach((entry, i) => {
      if(dietText[i].trim() === "") return;
      if(entry.length !== 0) {
        finalText += splTimeText[i] + "\n";
        clipboardText += "*" + splTimeText[i] + "*\n";
      }
      finalText += timeTime[i] + "\n";
      clipboardText += "_" + timeTime[i] + "_\n";
      finalText += dietText[i] + "\n";
      clipboardText += dietText[i].replaceAll("• ","• *").replaceAll("\n","*\n") + "*\n";
      finalText += "\n"+splBreakLine[i]+"\n\n";
      clipboardText += "\n"+splBreakLine[i]+"\n\n";
    });
    
    setFinalText(finalText);
    setClipboardText(clipboardText);
    
  }
    var preBtnClk = () => {
    switch (currInst){
      case 0:

        break;
      default:
        break;
    }
    setCurrInst(currInst - 1);
  };
  var onNameChange = (event) => {
    setNameText(event.target.value);
  };
  var nxtBtnClk = () => {
    switch (currInst){
      case 0:

        break;
      case timeText.length:
        generateFinalText();
        break;
      default:
        break;
    }
    setCurrInst(currInst + 1);
  };
  var onDateChange = (newDate) => {
    setDate(newDate);
  }
  var dietEntered = (diet) => {
    var finalStr = "";
    diet.target.value.split("\n").forEach((strs) => {
      if(strs.charAt(0) !== "•") strs = "• " + strs.trim();
      if(strs === "• " && diet.nativeEvent.inputType === "deleteContentBackward") {

      } else {
        finalStr += "\n" + strs;
      }
    });
    finalStr = finalStr.substring(1);
    dietText[currInst-1] = finalStr;
    setDietText(JSON.parse(JSON.stringify(dietText)));
  }
  var copyToClipboard = () => {
    console.log(clipboardText);
    navigator.clipboard.writeText(clipboardText);
    alert("Text copied successfully!!!");
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="Main-container">
          <div hidden={currInst-1 === timeText.length}>
          <h1>DIET PLAN</h1>
          <div hidden={currInst !== 0}>
            <input placeholder='Enter Name' className='name container' value={nameText} onChange={onNameChange}></input>
            <DatePicker className="container name" value={date.toDateString()} placeholderText='Select Date' onChange={onDateChange} />
          </div>
          <div hidden={currInst === 0}>
            <p><strong>{currInst-1 < timeText.length && timeText[currInst-1].length === 0 ? "" : (timeText[currInst-1]+" :")}</strong> {timeTime[currInst-1]}</p>
            <textarea className='textArea' placeholder='Enter Diet Here...' value={dietText[currInst-1]} onChange={dietEntered}></textarea>
          </div>
          </div>
          <div className='preview' hidden={currInst-1 !== timeText.length}>
            {finalText}
          </div>
          <div className='container footer'>
              <button className='navButton' disabled={currInst === 0} onClick={preBtnClk}> ⬅️ </button>
              <h4 hidden={currInst-1 === timeText.length}>{currInst + 1}</h4>
              <button onClick={copyToClipboard} hidden={currInst-1 !== timeText.length} className='copyButton'>Copy</button>
              <button className='navButton' disabled={currInst-1 === timeText.length} onClick={nxtBtnClk}> ➡️ </button>
          </div>          
          
        </div>
        
      </header>
    </div>
  );
}

export default App;
