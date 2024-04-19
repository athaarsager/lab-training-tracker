import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function AddPersonDialog({ open, handleClose }) {
    const dispatch = useDispatch();
    const [person, setPerson] = useState(
        {
            first_name: "",
            last_name: "",
            email: "",
            is_instructor: false
        }
    );

    const handleSubmit = (e) => {
        dispatch({ type: "ADD_PERSON", payload: person});
        handleClose();
    }
    return (
        <Dialog
        open={open} 
        onClose={handleClose}
        PaperProps={{ component: "form" /* onSubmit: handleSubmit */ }}
        >
        </Dialog>
    );
}

export default AddPersonDialog;