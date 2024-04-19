import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddPersonDialog from "./AddPersonDialog";
import Swal from "sweetalert2";
import Fuse from "fuse.js";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


export default function LandingPage() {
    const navigate = useNavigate(); // replacement of useHistory
    const dispatch = useDispatch();
    const people = useSelector(store => store.people);

    // Dialog variables
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const closeDialog = () => setDialogIsOpen(false);

    // TODO: 
    // Add search bar for searching for specific person
    // Link to lab list page
    // When an individual person is clicked on, take user to detail page for that person
    // On training page, need to add a backend query where when a training is added, a new entry is added to person_training for everyone, default value false

    // Search stuff
    // This is the text input in the form field that will be used for the search
    const [searchText, setSearchText] = useState("");
    const [searchSubmitted, setSearchSubmitted] = useState(false);
    // The options are the settings for the search Fuse.js makes. Details in documentation for what all the option settings are
    // options are also the second parameter that has to be passed into the Fuse function
    const options = {
        includeScore: true,
        // if this doesn't work, double check formatting of keys array
        keys: ["last_name"]
    }

    const fuse = new Fuse(people, options);

    // const result = fuse.search(insertVariableHere);

    const removePerson = (e) => {
        // fire modal
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            iconColor: "#ffa726",
            showCancelButton: true,
            confirmButtonColor: "#42a5f5",
            cancelButtonColor: "#f44336",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: "REMOVE_PERSON", payload: e.target.dataset.person_id });
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    iconColor: "#66bb6a",
                    confirmButtonColor: "#42a5f5"
                });
            }
        });
    }

    useEffect(() => {
        dispatch({ type: "FETCH_PEOPLE" });
        console.log("This is the value of people:", people);
    }, []);

    return (
        <Grid container>
            <Grid item xs={10}>
                <Typography variant="h4">Welcome to the Lab Training Tracker for INSERT INSTITUTION HERE</Typography>
                <Box sx={{ mb: "1rem" }}>
                    <Typography variant="h6">Find A Specific Person:</Typography>
                    <TextField id="search" name="search" label="Search by Last Name" type="text" size="small" /><Button variant="contained">Find</Button>
                </Box>
                <Button variant="contained" onClick={() => setDialogIsOpen(true)}>Add a New Person</Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Last Name</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Instructor?</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {/* Component will display one of two views based on if a search has been submitted */}
                            {/* Normal view is the list of everyone */}
                            {/* If searchSubmitted, just display the search results */}
                            {searchSubmitted ?
                                <Box>Test</Box>
                                :
                                <>
                                    {people?.map((person => (
                                        <TableRow key={person.id}>
                                            <TableCell>{person.last_name}</TableCell>
                                            <TableCell>{person.first_name}</TableCell>
                                            <TableCell>{person.email}</TableCell>
                                            <TableCell>{person.is_instructor ? "Yes" : "No"}</TableCell>
                                            <TableCell><Button data-person_id={person.id} color="error" variant="outlined" onClick={removePerson}>Remove</Button></TableCell>
                                        </TableRow>
                                    )))}
                                </>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <AddPersonDialog open={dialogIsOpen} handleClose={closeDialog} />
            </Grid>
        </Grid>
    );
}