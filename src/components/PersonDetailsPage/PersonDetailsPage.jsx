import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function PersonDetailsPage() {

    // TODO: 
    // Link to lab list page
    // On training page, need to add a backend query where when a training is added, a new entry is added to person_training for everyone, default value false

    return (
        <Grid container>
            <Grid item xs={10}>
                <Typography variant="h5">Person Details Page</Typography>
            </Grid>
        </Grid>
    );
}

export default PersonDetailsPage;