import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

const App = () => {
  const [load, setLoad] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoad(true);
    setErrorMsg("");

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "d-code_trail"); // exact preset name in Cloudinary

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/df8xpyycv/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) {
        throw new Error(`Cloudinary error: ${res.status}`);
      }

      const uploadedImage = await res.json();
      console.log("Uploaded Image URL:", uploadedImage.secure_url);
      setImageUrl(uploadedImage.secure_url);
    } catch (error) {
      console.error("Upload failed", error);
      setErrorMsg("Failed to upload image. Please try again.");
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="file-upload" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div className="upload-container" style={{ background: "yellow", padding: "2rem", borderRadius: "8px", textAlign: "center" }}>
        
        {load ? (
          <p>Uploading...</p>
        ) : (
          <>
            <div className="upload-icon">
              <IoCloudUploadOutline size={50} />
            </div>
            <input type="file" className="file-input" onChange={handleFileUpload} />
          </>
        )}

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

        {imageUrl && (
          <div style={{ marginTop: "1rem" }}>
            <img src={imageUrl} alt="Uploaded" style={{ height:"4rem",width:"4rem", borderRadius: "8px" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
