import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

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
        dispatch({ type: "ADD_PERSON", payload: person });
        handleClose();
    }
    return (
        <Box sx={{ minWidth: "50vh" }}>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{ component: "form", /* onSubmit: handleSubmit */ sx: { width: "50vh", padding: "1rem" }}}
            >
                <DialogTitle>Add a New Person</DialogTitle>
                <TextField sx={{ mb: ".5rem" }} required id="first_name" label="First Name" type="text" variant="standard" fullWidth />
                <TextField sx={{ mb: ".5rem" }} required id="last_name" label="Last Name" type="text" variant="standard" fullWidth />
                <TextField sx={{ mb: "1.5rem" }} required id="email" label="Email" type="email" variant="standard" fullWidth />
                {/* Need to make button for setting if a person is an instructor */}
                <FormControl fullWidth>
                    <InputLabel sx={{ mb: "2rem" }} id="is-instructor-label">Are They an Instructor?</InputLabel>
                    <Select
                        labelId="is-instructor-label"
                        id="is_instructor"
                        value={person.is_instructor}
                        label="Are They an Instructor?"
                    // insert onChange function here
                    >
                        <MenuItem value={false}>No</MenuItem>
                        <MenuItem value={true}>Yes</MenuItem>
                    </Select>
                </FormControl>
            </Dialog>
        </Box>
    );
}

export default AddPersonDialog;