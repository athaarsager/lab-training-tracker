import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddPersonDialog from "../PersonDialog/PersonDialog.jsx";
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
    // I use this variable so I don't have to write conditionally rendered HTML. This effectively takes care of the conditional rendering
    const [peopleToDisplay, setPeopleToDisplay] = useState(people);

    // Dialog variables
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const closeDialog = () => setDialogIsOpen(false);

    // Search stuff
    // This is the text input in the form field that will be used for the search
    const [searchText, setSearchText] = useState("");

    const submitSearch = (e) => {
        e.preventDefault();
        // This controls that if an empty string was submitted, just display the full list of people
        if (searchText === "") {
            setPeopleToDisplay(people);
            return;
        }
        const options = {
            // score is like a percent match
            includeScore: true,
            // if this doesn't work, double check formatting of keys array
            keys: ["last_name"]
        }
        // The options are the settings for the search Fuse.js makes. Details in documentation for what all the option settings are
        // options are also the second parameter that has to be passed into the Fuse function
        const fuse = new Fuse(people, options);
        // Have to parse the result object so I just have an array of people that matches my normal array of people
        const result = fuse.search(searchText);

        const peopleResult = [];
        for (const entry of result) {
            peopleResult.push(entry.item);
        }
        setPeopleToDisplay(peopleResult);
    }

    const removePerson = (e) => {
        e.stopPropagation();
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
                    text: "The person has been removed from the system.",
                    icon: "success",
                    iconColor: "#66bb6a",
                    confirmButtonColor: "#42a5f5"
                });
            }
        });
    }

    useEffect(() => {
        dispatch({ type: "FETCH_PEOPLE" });
    }, []);

    // Need this so the people displayed on the page updates whenever the people array is updated
    useEffect(() => {
        setPeopleToDisplay(people);
    }, [people]);

    return (
        <Grid container>
            <Grid item xs={10}>
                <Typography variant="h4">Welcome to the Lab Training Tracker for INSERT INSTITUTION HERE</Typography>
                <Box sx={{ mb: "1rem" }}>
                    <Typography variant="h6">Find A Specific Person:</Typography>
                    <TextField id="search" name="search" label="Search by Last Name" type="text" size="small"
                        value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    <Button variant="contained" onClick={submitSearch}>Find</Button>
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
                            {/* Page will normally just display the array of people */}
                            {/* But if a search has been submitted, that array will be the search results */}
                            {/* This is constrolled by the peopleToDisplay useState variable */}
                            {peopleToDisplay?.map((person => (
                                // Need to use e.currentTarget in the navigate string so that the row is always the thing that is controlling the event, not the table cell
                                <TableRow sx={{ cursor: "pointer" }} key={person.id} data-person_id={person.id} onClick={(e) => navigate(`/${e.currentTarget.dataset.person_id}/details`)}>
                                    <TableCell>{person.last_name}</TableCell>
                                    <TableCell>{person.first_name}</TableCell>
                                    <TableCell>{person.email}</TableCell>
                                    <TableCell>{person.is_instructor ? "Yes" : "No"}</TableCell>
                                    <TableCell><Button data-person_id={person.id} color="error" variant="outlined" onClick={removePerson}>Remove</Button></TableCell>
                                </TableRow>
                            )))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <AddPersonDialog open={dialogIsOpen} handleClose={closeDialog} />
            </Grid>
        </Grid>
    );
}