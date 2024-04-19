import { useState } from 'react';
import LandingPage from '../LandingPage/LandingPage';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Grid from "@mui/material/Grid";


function App() {
  const [count, setCount] = useState(0)

  return (
    <Grid container>
      <Grid item>
        <LandingPage />
      </Grid>
    </Grid>
  )
}

export default App
