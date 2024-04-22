import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
function NavBar() {
    return (
        <Grid sx={{ height: "6vh", backgroundColor: "#0288d1" }} container>
            <Grid item xs={10}>
            </Grid>
            <Grid item xs={2} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                    <Typography sx={{ mr: "1rem" }} variant="body">Home</Typography>
                    <Typography sx={{ mr: "1rem" }} variant="body">Trainings</Typography>
            </Grid>
        </Grid>
    );
}

export default NavBar;