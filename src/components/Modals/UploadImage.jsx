import React from "react";
import { useData } from "../../contexts/StateProvider";
import { classes, getModalStyle } from "./styles";
import ImageUpload from "../ImageUpload";
import { Box, Modal } from "@mui/material";

function UploadImage({ uploadOpen, setUploadOpen }) {
  const [modalStyle] = React.useState(getModalStyle);

  const [{ user }] = useData();

  const handleUploadClose = () => setUploadOpen(false);

  return (
    <Modal open={uploadOpen} onClose={handleUploadClose}>
      <Box style={modalStyle} sx={classes.paper}>
        {user ? (
          <ImageUpload
            username={user.displayName}
            closeModal={handleUploadClose}
          />
        ) : (
          <h3>Something goes wrong</h3>
        )}
      </Box>
    </Modal>
  );
}

export default UploadImage;
