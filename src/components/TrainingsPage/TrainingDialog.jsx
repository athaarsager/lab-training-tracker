import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Grid";
function TrainingDialog({ open, handleClose, selectedTraining }) {
    const [training, setTraining] = useState(
        {
            title: "",
            short_title: "",
            validation_length: ""
        }
    );

    return (
        <Box sx={{ minWidth: "50vh" }}>
            <Dialog
                open={open}
                // onClose={closeDialog}
                PaperProps={{ component: "form", /*onSubmit: handleSubmit,*/ sx: { width: "50vh", padding: "1rem" } }}
            >
                <DialogTitle>{selectedTraining ? "Update Training Details" : "Add a New Training"}</DialogTitle>
                <TextField xs={{ mb: ".5rem" }} required id="title" name="title" label="full title" type="text" variant="standard" fullWidth
                value={training.title} />
                <TextField xs={{ mb: ".5rem" }} required id="short_title" name="short_title" label="Short Title" type="text" variant="standard" fullWidth
                value={training.short_title} />
                <TextField xs={{ mb: ".5rem" }} required id="validation_length" name="validation_length" label="Years Good For" type="number" variant="standard" fullWidth
                value={training.validation_length} />
            </Dialog>
        </Box>
    );
}

export default TrainingDialog;