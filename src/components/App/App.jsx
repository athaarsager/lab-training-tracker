import "./App.css";
import LandingPage from '../LandingPage/LandingPage';
import PersonDetailsPage from '../PersonDetailsPage/PersonDetailsPage';
import NavBar from '../NavBar/NavBar';
import TrainingsPage from '../TrainingsPage/TrainingsPage';
import { createTheme, ThemeProvider } from "@mui/material/styles";
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

  const themeOptions = {
    palette: {
      mode: 'light',
      primary: {
        main: '#1b9f9f',
      },
      secondary: {
        main: '#0288d1',
        light: '#03a9f4',
      },
      success: {
        main: '#1b9f1b',
      },
      warning: {
        main: '#dc8020',
        light: 'rgb(227, 153, 76)',
      },
      error: {
        main: '#9F1B1B',
      },
      info: {
        main: '#0288d1',
        light: '#03a9f4',
        dark: "rgb(1, 95, 146)"
      },
    },
  }

  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Grid container>
          <Grid item xs={12}>
            <NavBar />
          </Grid>
          <Grid item xs={12}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/:id/details" element={<PersonDetailsPage />} />
              <Route path="/trainings" element={<TrainingsPage />} />
            </Routes>
          </Grid>
        </Grid >
      </Router>
    </ThemeProvider>
  )
}

export default App;
