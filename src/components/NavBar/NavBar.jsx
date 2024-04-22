import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
function NavBar() {
    return (
        <Grid container>
            <Grid sx={{ height: "5vh", backgroundColor: "#0288d1"}} item xs={12}>
            <Typography variant="h6">Nav</Typography>
            </Grid>
        </Grid>
    );
}

export default NavBar;