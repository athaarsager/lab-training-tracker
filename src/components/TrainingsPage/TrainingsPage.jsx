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
    // TODO: 
    // Link to training list page
    // On training page, need to add a backend query where when a training is added, a new entry is added to person_training for everyone, default value false
    // The above may not be necessary based on how I made the queries on the person details page

    // When designing the dialog box, should make it reusable for creating a new training and editing an existing one
    // For editing an existing training it should pre-populated with the training that was clicked on
    // May be tricky to set and unset that variable...maybe need to create new variable in the store?
    return (
        <Grid container>
            <Grid item>
                <Typography variant="h4">Welcome to the Trainings Page!</Typography>
            </Grid>
        </Grid>
    );
}

export default TrainingsPage;