import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router";
import moment from "moment";
import "./PersonDetailsPage.css";
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
    const trainings = useSelector(store => store.trainingStatuses);

    // TODO: 
    // Link to training list page
    // On training page, need to add a backend query where when a training is added, a new entry is added to person_training for everyone, default value false
    // The above may not be necessary based on how I made the queries on the person details page

    // will pass each training status into this function individually in the HTML below
    const calculateDueDate = (training) => {
        if (!training.date_taken) {
            return "Training Not Taken";
        }
        const dateTaken = training.date_taken;
        const today = moment();
        const dateDue = moment(dateTaken).add(training.validation_length, "years");
        const yearDiff = dateDue.diff(today, "years");
        // Need to pass in true as final parameter to make this number as accurate as possible
        // Then need to round up to get to the nearest whole day, so that due dates are actually a full year apart
        // Otherwise, off by one
        const dayDiff = Math.ceil(dateDue.diff(today, "days", true));

        if (dayDiff <= 0) {
            return "Training Due";
        } else if (dayDiff == 1) {
            return "1 day"
        } else if (dayDiff <= 90) {
            return `Training due in ${dayDiff} days`;
        } else if (yearDiff < 1) {
            return "Training due in less than 1 year";
        } else {
            return `Training not due for over ${yearDiff} year(s).`;
        }
    }

    // This function takes the result from the above function to determine a css class
    // That will set the background color of the cell
    const determineDueDateClass = (training) => {
        const result = calculateDueDate(training);
        if (result.includes("day")) {
            return "due-soon";
        } else if(result === "Training Due") {
            return "due-now";
        }
    }

    const displayButton = (training) => {

        if (!training.date_taken || calculateDueDate(training) === "Training Due") {
            return true;
        } else {
            return false;
        }
    }

    // Allow training records to be updated
    const updateTrainingRecords = (e) => {
        const person_id = personId;
        const training_id = e.target.dataset.training_id;
        const person_training_id = e.target.dataset.person_training_id;
        // if person_training_id is null, need to add a new entry to the person_training table
        if (!person_training_id) {
            dispatch({ type: "ADD_PERSON_TRAINING_ENTRY", payload: { person_id, training_id } });
            return;
        }
        // otherwise, just update existing entry
        dispatch({ type: "UPDATE_TRAINING_RECORDS", payload: { person_training_id, person_id} });
    }

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
                <Typography variant="h6" sx={{ mb: "1rem" }}>Trainings</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Full Title</TableCell>
                                <TableCell>Short Title</TableCell>
                                <TableCell>Date Last Taken</TableCell>
                                <TableCell>Due Again In</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trainings.map(training => (
                                <TableRow key={training.training_id}>
                                    <TableCell>{training.title}</TableCell>
                                    <TableCell>{training.short_title}</TableCell>
                                    <TableCell>{training.date_taken ? moment(training.date_taken).format("MM-DD-YYYY") : "N/A"}</TableCell>
                                    <TableCell className={determineDueDateClass(training)}>{calculateDueDate(training)}</TableCell>
                                    <TableCell>{displayButton(training) &&
                                        <Button data-training_id={training.training_id}
                                            data-person_training_id={training.person_training_id}
                                            color="success" variant="outlined" onClick={updateTrainingRecords}>
                                            Take Training
                                        </Button>}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default PersonDetailsPage;