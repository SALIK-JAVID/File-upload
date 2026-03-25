import React, { useState, useRef } from "react";
import axios from "axios";

function Upload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);   //progress bar 0% before uploading 100% after uploading 
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setProgress(0);
  };

  const handleUpload = async () => {
    if(!file) {
        alert("Please select a file");
        return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percent);
        },


      });
      console.log(res.data);
      alert("Upload successful!");
      setProgress(100)
      setFile(null);
      fileInputRef.current.value = "";
      setTimeout (() => {
        setProgress(0);
      }, 5000);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
      setProgress(0)
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file"  ref= {fileInputRef} onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {/* progress bar */}
      <div style={{ marginTop: "20px", width: "300px" }}>
        <div
          style={{
            height: "20px",
            width: `${progress}%`,
            backgroundColor: "green",
            transition: "width 0.3s",
          }}
        ></div>
      </div>

      <p>{progress}%</p>
    </div>
  );
}

export default Upload;