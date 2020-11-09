import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import "./ImageUpload.css";
import { storage, db } from "../database";
import firebase from "firebase";

function ImageUpload({ username, closeModal }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTusk = storage.ref(`images/${image.name}`).put(image);

    //wizualize progress
    uploadTusk.on(
      "state_changed",
      (snapshot) => {
        const persentsOfProgress = Math.round(
          (snapshot.bytesTransfered / snapshot.totalBytes) * 100
        );
        setProgress(persentsOfProgress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imgUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
            closeModal();
          });
      }
    );
  };

  return (
    <div className="imageUploader">
      <progress
        value={progress}
        max="100"
        className="imageUploader__progress"
      />
      <Input
        placeholder="Enter a caption..."
        className="imageUploader__caption"
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
      />
      <input
        type="file"
        className="imageUploader__file"
        onChange={handleChange}
      />
      <Button onClick={handleUpload} variant="contained" color="secondary">
        {" "}
        Upload{" "}
      </Button>
    </div>
  );
}

export default ImageUpload;
