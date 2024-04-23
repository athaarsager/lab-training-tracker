import { NavLink } from "react-router-dom";
import "./NavBar.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
function NavBar() {
    return (
        <Grid sx={{ height: "8vh", backgroundColor: "#1b9f9f" }} container>
            <Grid item xs={10} display="flex" alignItems="center">
                <Typography sx={{ color: "white", ml: ".5rem" }} variant="h5">Institution Name Here</Typography>
            </Grid>
            <Grid item xs={2} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                <NavLink to="/" className={({ isActive }) =>
                    [
                        isActive ? "active" : "link"
                    ]
                }>Home</NavLink>
                <NavLink to="/trainings" className={({ isActive }) =>
                    [
                        isActive ? "active" : "link"
                    ]
                }>Trainings</NavLink>
            </Grid>
        </Grid>
    );
}

export default NavBar;