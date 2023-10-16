import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { axiosAdmin } from "../../../Api/Api";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "40px",
  width: 400,
  bgcolor: "#FFFFFF", // Use a light color for background
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)", // Adjust box shadow
  p: 4,
};

function PhotoAddModal({ projectId }) {
  console.log(projectId);
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState([]); // State to store multiple photos

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePhotoChange = (event) => {
    const selectedPhotos = event.target.files;
    setPhotos(selectedPhotos);
    // console.log("Selected photos:", selectedPhotos);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a FormData object to store the photos
    const formData = new FormData();
  
    // Append each selected photo to the FormData object
    for (let i = 0; i < photos.length; i++) {
      formData.append("photos", photos[i]);
    }

    console.log("hiiiinformmmmmmmmmmmmm",formData);
  
    try {
      // Send the FormData object to the backend using axios
      const response = await axiosAdmin.post(`addprojectphotos?projectId=${projectId}`, formData ,{ headers: {
        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
      },
    });
  
      console.log("Response from backend:", response.data);
      handleClose();
    } catch (error) {
      console.error("Error uploading photos:", error);
      // Handle errors (display an error message, etc.)
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="outlined" color="primary">
        ADD PROJECT PHOTO
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h5" mb={2} mx={10}>
            Select photos
          </Typography>
          <div className="mb-4">
            <TextField
              type="file"
              inputProps={{ multiple: true }} // Allow multiple file selection
              fullWidth
              onChange={handlePhotoChange}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default PhotoAddModal;
