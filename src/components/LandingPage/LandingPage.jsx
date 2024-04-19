import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


export default function LandingPage() {
    const navigate = useNavigate(); // replacement of useHistory
    const dispatch = useDispatch();
    const people = useSelector(store => store.people);

    // TODO: 
    // display list of people
    // Allow individual people to be deleted/removed
    // Add search bar for searching for specific person
    // Create dialog for adding a new person
    // Link to resources page
    // When an individual person is clicked on, take user to detail page for that person
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {people?.map((person => (
                                <TableRow key={person.id}>
                                    <TableCell>{person.last_name}</TableCell>
                                    <TableCell>{person.first_name}</TableCell>
                                    <TableCell>{person.email}</TableCell>
                                    <TableCell>{person.is_instructor}</TableCell>
                                </TableRow>
                            )))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}