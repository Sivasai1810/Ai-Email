import React, { useState } from "react";
import axios from "axios";
import "../controls/dashboard.css"
import word from "../assets/word.png"
const Dashboard = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [valid,setValid]=useState(false)
  const handleEdit = () =>{
    setShowPopup(false); 
  };
  const handlerecipt = () => {
  if (!email || !subject || !text) {
  setShowPopup(false);
  return alert("Please fill all fields before confirming!");
}
  setShowPopup(true);

  };
  const handleai=async()=>{
    const res=await axios.post("http://localhost:4000/prompt/message",{
      text
    })
     setText(res.data.message.content)
      }
  const handlesubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/req/send/email",
        { email, subject, text },
        { withCredentials: true }
      );
      alert(res.data.message);
    if(res.data.success==true){
      setEmail("")
      setText("")
      setSubject("")
    }
      setShowPopup(false); 
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="welcome-title">Welcome to Tonify</h1>
        
        <div className="form-group">
          <label className="form-label">To</label>
          <input
            type="email"
            className="form-input"
            placeholder="Enter recipient email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Subject</label>
          <textarea
            className="form-textarea"
            placeholder="Enter email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label className="form-label">Message</label>
          <textarea
            className="form-textarea"
            placeholder="Enter your message here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className="ai-assistant">
            <img src={word} alt="AI Assistant" onClick={handleai} />
          </div>
        </div>

        <button className="confirm-button" onClick={handlerecipt}>
          Confirm & Send
        </button>

        {showPopup && (
          <div className="popup-container">
            <div className="popup-box">
              <h4 className="popup-title">Email Confirmation</h4>
              <div className="popup-content">
                <div className="popup-field">
                  <div className="popup-field-label">To:</div>
                  <div className="popup-field-value">{email}</div>
                </div>
                <div className="popup-field">
                  <div className="popup-field-label">Subject:</div>
                  <div className="popup-field-value">{subject}</div>
                </div>
                <div className="popup-field">
                  <div className="popup-field-label">Message:</div>
                  <div className="popup-field-value">{text}</div>
                </div>
              </div>
              <div className="popup-buttons">
                <button className="popup-btn edit-btn" onClick={handleEdit}>
                  Edit
                </button>
                <button className="popup-btn send-btn" onClick={handlesubmit}>
                  Send Email
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 
