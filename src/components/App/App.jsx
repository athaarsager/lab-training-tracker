import { useState } from 'react';
import LandingPage from '../LandingPage/LandingPage';
import PersonDetailsPage from '../PersonDetailsPage/PersonDetailsPage';
import NavBar from '../NavBar/NavBar.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Grid from "@mui/material/Grid";
// BrowserRouter automatically creates a history object
// since this is a simple application, don't need to customize the history object
// (automattically sets paths to match with the url in the browser)
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Grid container>
        <Grid item xs={12}>
          <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/:id/details" element={<PersonDetailsPage />} />
          </Routes>
        </Grid>
      </Grid >
    </Router>
  )
}

export default App;
