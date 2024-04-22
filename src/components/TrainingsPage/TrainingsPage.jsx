import { useState, useEffect } from "react";
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
import Button from "@mui/material/Button";
function TrainingsPage() {
    const dispatch = useDispatch();
    const trainings = useSelector(store => store.trainings);

    // TODO: 
    // Link to training list page
    // On training page, need to add a backend query where when a training is added, a new entry is added to person_training for everyone, default value false
    // The above may not be necessary based on how I made the queries on the person details page

    // When designing the dialog box, should make it reusable for creating a new training and editing an existing one
    // For editing an existing training it should pre-populated with the training that was clicked on
    // May be tricky to set and unset that variable...maybe need to create new variable in the store?

    useEffect(() => {
        dispatch({ type: "FETCH_TRAININGS" });
    }, []);

    return (
        <Grid container>
            <Grid item>
                <Typography variant="h4">Trainings</Typography>
                <TableContainer component={Paper} sx={{ mb: "2rem" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Full Title</TableCell>
                                <TableCell>Short Title</TableCell>
                                <TableCell>Length Good For</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {trainings.map(training => (
                            <TableRow key={training.id}>
                                <TableCell>{training.title}</TableCell>
                                <TableCell>{training.short_title}</TableCell>
                                <TableCell>{training.validation_length}</TableCell>
                                <TableCell><Button variant="outlined" color="secondary">Edit Training</Button></TableCell>
                                <TableCell><Button variant="outlined" color="error">Delete Training</Button></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default TrainingsPage;