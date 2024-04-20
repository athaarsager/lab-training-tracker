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

    // TODO: 
    // Link to lab list page
    // On training page, need to add a backend query where when a training is added, a new entry is added to person_training for everyone, default value false

    // Display person's full details
    // Display all trainings and whether the person has taken them
    // Allow a person's information to be updated form here

    return (
        <Grid container>
            <Grid item xs={10}>
                <Typography variant="h5">Person Details Page</Typography>
                {/* Make two tables: one for person's info, the other for training info */}
            </Grid>
        </Grid>
    );
}

export default PersonDetailsPage;