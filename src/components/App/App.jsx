import { useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Grid container>
      <Grid item>
      <Typography variant="h4">Welcome to the Lab Training Tracker for INSERT INSTITUTION HERE</Typography>
      </Grid>
    </Grid>
  )
}

export default App
