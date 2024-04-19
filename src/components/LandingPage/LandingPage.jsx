import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";


export default function LandingPage() {
    const navigate = useNavigate(); // replacement of useHistory
    const dispatch = useDispatch();
    const people = useSelector(store => store.people);

    // TODO: 
    // Allow individual people to be deleted/removed
    // Add search bar for searching for specific person
    // Create dialog for adding a new person
    // Link to resources page
    // When an individual person is clicked on, take user to detail page for that person

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
                            {people?.map((person => (
                                <TableRow key={person.id}>
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
            </Grid>
        </Grid>
    )
}