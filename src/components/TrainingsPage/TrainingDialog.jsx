import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Grid";
function TrainingDialog({ open, handleClose, selectedTraining }) {
    const dispatch = useDispatch();
    const [training, setTraining] = useState(
        {
            title: "",
            short_title: "",
            validation_length: ""
        }
    );

    const updateTraining = (e) => {
        const { name, value } = e.target;
        if (name === "short_title") {
            setTraining((state) => ({ ...state, [name]: value.toUpperCase() }));
        } else {
            setTraining((state) => ({ ...state, [name]: value }));
        }
    }

    const closeDialog = () => {
        handleClose();
        // Need to do the below in case Add Training selected twice in a row
        setTraining(
            {
                title: "",
                short_title: "",
                validation_length: ""
            }
        );
        if (Object.keys(selectedTraining).length > 0) {
            // make sure the selected training is cleared when the dialog is closed and value is not an empty object
            dispatch({ type: "CLEAR_SELECTED_TRAINING" });
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(selectedTraining).length > 0) {
            dispatch({ type: "UPDATE_TRAINING", payload: training });
            Swal.fire({
                title: "Success!",
                text: "Training Info Updated!",
                icon: "success",
                // success.main
                iconColor: "#66bb6a",
                // primary.dark
                confirmButtonColor: "#42a5f5"
            });
        } else {
            dispatch({ type: "ADD_TRAINING", payload: training });
            Swal.fire({
                title: "Success!",
                text: "New Training Successfully Added!",
                icon: "success",
                // success.main
                iconColor: "#66bb6a",
                // primary.dark
                confirmButtonColor: "#42a5f5"
            });
        }
        closeDialog();
    }

    useEffect(() => {
        if (Object.keys(selectedTraining).length > 0) {
            setTraining({
                id: selectedTraining.id,
                title: selectedTraining.title,
                short_title: selectedTraining.short_title,
                validation_length: selectedTraining.validation_length
            });
        }
    }, [selectedTraining]);

    return (
        <Box sx={{ minWidth: "50vh" }}>
            <Dialog
                open={open}
                onClose={closeDialog}
                PaperProps={{ component: "form", onSubmit: handleSubmit, sx: { width: "50vh", padding: "1rem" } }}
            >
                <DialogTitle>{selectedTraining ? "Update Training Details" : "Add a New Training"}</DialogTitle>
                <TextField xs={{ mb: ".5rem" }} required id="title" name="title" label="full title" type="text" variant="standard" fullWidth
                    value={training.title} onChange={updateTraining} />
                <TextField xs={{ mb: ".5rem" }} required id="short_title" name="short_title" label="Short Title" type="text" variant="standard" fullWidth
                    value={training.short_title} onChange={updateTraining} />
                <TextField xs={{ mb: ".5rem" }} required id="validation_length" name="validation_length" label="Years Good For" type="number" variant="standard" fullWidth
                    value={training.validation_length} onChange={updateTraining} />
                <DialogActions>
                    <Button color="error" onClick={closeDialog}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default TrainingDialog;