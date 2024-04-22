import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
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

function PersonDialog({ open, handleClose, selectedPerson }) {
    const dispatch = useDispatch();
    const [person, setPerson] = useState(
        selectedPerson ?
            {
                first_name: selectedPerson.first_name,
                last_name: selectedPerson.last_name,
                email: selectedPerson.email,
                is_instructor: selectedPerson.is_instructor
            } :
            {
                first_name: "",
                last_name: "",
                email: "",
                is_instructor: false
            }
    );

    const updatePerson = (e) => {
        const { name, value } = e.target;
        setPerson((state) => ({ ...state, [name]: value }));
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        // first option submits if existing person has been loaded into the dialog
        // second option submits if adding a brand new person
        if (selectedPerson) {
            dispatch({ type: "UPDATE_PERSON", payload: person });
        } else {
            dispatch({ type: "ADD_PERSON", payload: person });
        }
        handleClose();
        Swal.fire({
            title: "Success!",
            text: "New Person Successfully Added!",
            icon: "success",
            iconColor: "#66bb6a",
            confirmButtonColor: "#42a5f5"
        });
    }

    const closeDialog = () => {
        handleClose();
        if (!selectedPerson) {
            setPerson(
                {
                    first_name: "",
                    last_name: "",
                    email: "",
                    is_instructor: false
                }
            );
        }
    }

    useEffect(() => {
        console.log("In dialog. This is the selected person:", selectedPerson);
    }, [open]);

    return (
        <Box sx={{ minWidth: "50vh" }}>
            <Dialog
                open={open}
                onClose={closeDialog}
                PaperProps={{ component: "form", onSubmit: handleSubmit, sx: { width: "50vh", padding: "1rem" } }}
            >
                <DialogTitle>{selectedPerson ? "Update Person's Info" : "Add a New Person"}</DialogTitle>
                <TextField sx={{ mb: ".5rem" }} required id="first_name" name="first_name" label="First Name" type="text" variant="standard" fullWidth
                    value={person.first_name} onChange={updatePerson} />

                <TextField sx={{ mb: ".5rem" }} required id="last_name" name="last_name" label="Last Name" type="text" variant="standard" fullWidth
                    value={person.last_name} onChange={updatePerson} />

                <TextField sx={{ mb: "1.5rem" }} required id="email" name="email" label="Email" type="email" variant="standard" fullWidth
                    value={person.email} onChange={updatePerson} />
                {/* Need to make button for setting if a person is an instructor */}
                <FormControl fullWidth>
                    <InputLabel sx={{ mb: "2rem" }} id="is-instructor-label">Are They an Instructor?</InputLabel>
                    <Select
                        labelId="is-instructor-label"
                        id="is_instructor"
                        value={person.is_instructor}
                        label="Are They an Instructor?"
                        name="is_instructor"
                        onChange={updatePerson}
                    >
                        <MenuItem value={false}>No</MenuItem>
                        <MenuItem value={true}>Yes</MenuItem>
                    </Select>
                    <DialogActions>
                        <Button color="error" onClick={closeDialog}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </FormControl>
            </Dialog>
        </Box>
    );
}

export default PersonDialog;