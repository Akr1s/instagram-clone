import { Modal } from "@material-ui/core";
import React from "react";
import { useData } from "../../contexts/StateProvider";
import { useStyles, getModalStyle } from "./styles";
import ImageUpload from "../ImageUpload";

function UploadImage({ uploadOpen, setUploadOpen }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [{ user }] = useData();

  const handleUploadClose = () => setUploadOpen(false);

  return (
    <Modal open={uploadOpen} onClose={handleUploadClose}>
      <div style={modalStyle} className={classes.paper}>
        {user ? (
          <ImageUpload
            username={user.displayName}
            closeModal={handleUploadClose}
          />
        ) : (
          <h3>Something goes wrong</h3>
        )}
      </div>
    </Modal>
  );
}

export default UploadImage;
