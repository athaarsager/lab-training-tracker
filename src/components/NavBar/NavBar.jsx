import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./NavBar.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from '@mui/icons-material/Home';
import BiotechIcon from '@mui/icons-material/Biotech';

function NavBar() {
    const navigate = useNavigate();
    // set drawer open to false by default
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    }

    const DrawerList = (
        <Box sx={{ width: 180 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/")}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/trainings")}>
                        <ListItemIcon>
                            <BiotechIcon />
                        </ListItemIcon>
                        <ListItemText primary="Trainings" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={toggleDrawer}>
                        <ListItemIcon>
                            <CloseIcon />
                        </ListItemIcon>
                        <ListItemText primary="Close" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

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