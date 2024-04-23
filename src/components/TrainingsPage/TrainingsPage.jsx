import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TrainingDialog from "./TrainingDialog";
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
import Box from "@mui/material/Box";
function TrainingsPage() {
    const dispatch = useDispatch();
    const trainings = useSelector(store => store.trainings);
    const selectedTraining = useSelector(store => store.selectedTraining);

    // Dialog variables
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const closeDialog = () => setDialogIsOpen(false);

    const openUpdateTrainingDialog = (e) => {
        const training = {
            id: e.target.dataset.id,
            title: e.target.dataset.title,
            short_title: e.target.dataset.short_title,
            validation_length: e.target.dataset.validation_length
        }
        dispatch({ type: "SET_SELECTED_TRAINING", payload: training });
        setDialogIsOpen(true);
    }

    const deleteTraining = (e) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            iconColor: "#ffa726",
            showCancelButton: true,
            // primary.dark
            confirmButtonColor: "#42a5f5",
            // error.main
            cancelButtonColor: "#f44336",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: "REMOVE_TRAINING", payload: e.target.dataset.training_id });
                Swal.fire({
                    title: "Deleted!",
                    text: "The training has been deleted.",
                    icon: "success",
                    // success.main
                    iconColor: "#66bb6a",
                    // primary.dark
                    confirmButtonColor: "#42a5f5"
                })
            }
        });
    }

    useEffect(() => {
        dispatch({ type: "FETCH_TRAININGS" });
    }, []);

    return (
        <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography sx={{ mb: "1rem", mt: "1rem" }} variant="h4">Trainings</Typography>
                    <Button onClick={(e) => setDialogIsOpen(true)} sx={{ mb: "1rem" }} variant="contained">Add a New Training</Button>
                </Box>
                <TableContainer component={Paper} sx={{ mb: "2rem" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Full Title</TableCell>
                                <TableCell>Short Title</TableCell>
                                <TableCell>Good For</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trainings.map(training => (
                                <TableRow key={training.id}>
                                    <TableCell>{training.title}</TableCell>
                                    <TableCell>{training.short_title}</TableCell>
                                    <TableCell>{training.validation_length + " year(s)"}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            data-id={training.id}
                                            data-title={training.title}
                                            data-short_title={training.short_title}
                                            data-validation_length={training.validation_length}
                                            onClick={(openUpdateTrainingDialog)}
                                        >
                                            Edit Training
                                        </Button>
                                    </TableCell>
                                    <TableCell><Button data-training_id={training.id} onClick={deleteTraining} variant="outlined" color="error">Delete Training</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TrainingDialog open={dialogIsOpen} handleClose={closeDialog} selectedTraining={selectedTraining} />
            </Grid>
            <Grid item xs={1}></Grid>
        </Grid>
    );
}

export default TrainingsPage;