import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router";
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

function PersonDetailsPage() {
    const dispatch = useDispatch();
    const personId = useParams().id;
    const person = useSelector(store => store.selectedPerson);

    // TODO: 
    // Link to lab list page
    // On training page, need to add a backend query where when a training is added, a new entry is added to person_training for everyone, default value false

    // Display all trainings and whether the person has taken them
    // Allow trainings to be updated
    // Allow a person's information to be updated from here

    useEffect(() => {
        dispatch({ type: "FETCH_SELECTED_PERSON_INFO", payload: personId });
    }, []);

    return (
        <Grid container>
            <Grid item xs={10}>
                <Typography variant="h5">Person Details Page</Typography>
                {/* Make two tables: one for person's info, the other for training info */}
                <TableContainer component={Paper} sx={{ mb: "2rem" }}>
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
                            <TableRow>
                                <TableCell>{person.last_name}</TableCell>
                                <TableCell>{person.first_name}</TableCell>
                                <TableCell>{person.email}</TableCell>
                                <TableCell>{person.is_instructor ? "Yes" : "No"}</TableCell>
                                <TableCell><Button data-person_id={person.id} color="secondary" variant="outlined">Update Info</Button></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default PersonDetailsPage;