import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


export default function LandingPage() {
    const navigate = useNavigate(); // replacement of useHistory
    const dispatch = useDispatch();
    const people = useSelector(store => store.people);

    // TODO: 
    // display list of people
    // Allow individual people to be deleted/removed
    // Add search bar for searching for specific person
    // Create dialog for adding a new person
    // Link to resources page
    // When an individual person is clicked on, take user to detail page for that person
    useEffect(() => {
        dispatch({ type: "FETCH_PEOPLE" });
    }, []);
    return (
        <Grid container>
            <Grid item>
                <Typography variant="h4">Welcome to the Lab Training Tracker for INSERT INSTITUTION HERE</Typography>
            </Grid>
        </Grid>
    )
}