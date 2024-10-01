import React, { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import { Alert } from '@mui/material'

export default function Feedback({ data, onClose }) {
    const [severity, setSeverity] = useState("");
    const [open, setOpen] = useState(false);
    
  useEffect(() => {
    if (data) {
      setOpen(true);
      if (data.error) {
          setSeverity("error");
      } else {
          setSeverity("success")
      }
    } else {
      setOpen(false)
    }
    },[setOpen, setSeverity, data])

  const handleClose = () => {
    onClose();
    setOpen(false);
  };
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} variant='filled'>
            {data.error || data.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
