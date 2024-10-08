import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import EditPersonDialog from '../PersonDialog/PersonDialog.jsx';
import moment from 'moment';
import './PersonDetailsPage.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { clearSelectedPerson } from '../../redux/reducers/selectedPerson.reducer.js';

function PersonDetailsPage() {
  const dispatch = useDispatch();
  const personId = useParams().id;
  const person = useSelector((store) => store.selectedPerson);
  const trainings = useSelector((store) => store.trainingStatuses);

  // Dialog variables
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const closeDialog = () => setDialogIsOpen(false);

  // will pass each training status into this function individually in the HTML below
  const calculateDueDate = (training) => {
    if (!training.date_taken) {
      return 'Training Not Taken';
    }
    const dateTaken = training.date_taken;
    const today = moment();
    const dateDue = moment(dateTaken).add(training.validation_length, 'years');
    const yearDiff = dateDue.diff(today, 'years');
    // Need to pass in true as final parameter to make this number as accurate as possible
    // Then need to round up to get to the nearest whole day, so that due dates are actually a full year apart
    // Otherwise, off by one
    const dayDiff = Math.ceil(dateDue.diff(today, 'days', true));

    if (dayDiff <= 0) {
      return 'Training Due';
    } else if (dayDiff == 1) {
      return '1 day';
    } else if (dayDiff <= 90) {
      return `Training due in ${dayDiff} days`;
    } else if (yearDiff < 1) {
      return 'Training due in less than 1 year';
    } else {
      return `Training not due for over ${yearDiff} year(s).`;
    }
  };

  // This function takes the result from the above function to determine a css class
  // That will set the background color of the cell
  const determineDueDateClass = (training) => {
    const result = calculateDueDate(training);
    if (result.includes('day')) {
      return 'due-soon';
    } else if (result === 'Training Due' || result === 'Training Not Taken') {
      return 'due-now';
    }
  };

  const displayButton = (training) => {
    if (!training.date_taken || calculateDueDate(training) === 'Training Due') {
      return true;
    } else {
      return false;
    }
  };

  // Allow training records to be updated
  const updateTrainingRecords = (e) => {
    const person_id = personId;
    const training_id = e.target.dataset.training_id;
    const person_training_id = e.target.dataset.person_training_id;
    // if person_training_id is null, need to add a new entry to the person_training table
    if (!person_training_id) {
      dispatch({ type: 'ADD_PERSON_TRAINING_ENTRY', payload: { person_id, training_id } });
      return;
    }
    // otherwise, just update existing entry
    dispatch({ type: 'UPDATE_TRAINING_RECORDS', payload: { person_training_id, person_id } });
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_SELECTED_PERSON_INFO', payload: personId });
    // run cleanup function to clear the selected person so the dialog does not display incorrect
    // information the next time it appears on screen
    return () => clearSelectedPerson();
  }, []);

  useEffect(() => {
    console.log('This is the selectedPerson:', person);
  }, [person]);

  return (
    <Grid container>
      <Grid item xs={1}></Grid>
      <Grid sx={{ mb: '3rem' }} item xs={10}>
        <Typography textAlign='center' sx={{ mt: '1rem', mb: '1rem' }} variant='h4'>
          Details on {person.first_name} {person.last_name}
        </Typography>
        {/* Make two tables: one for person's info, the other for training info */}
        <Typography variant='h6' sx={{ mb: '1rem' }}>
          {person.first_name}&apos;s Personal Info
        </Typography>
        <TableContainer component={Paper} sx={{ mb: '2rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Last Name</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Instructor?</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{person.last_name}</TableCell>
                <TableCell>{person.first_name}</TableCell>
                <TableCell>{person.email}</TableCell>
                <TableCell>{person.is_instructor ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button onClick={() => setDialogIsOpen(true)} color='secondary' variant='outlined'>
                    Update Info
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant='h6' sx={{ mb: '1rem' }}>
          Status of {person.first_name}&apos;s Trainings
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Full Title</TableCell>
                <TableCell>Short Title</TableCell>
                <TableCell>Date Last Taken</TableCell>
                <TableCell>Due Again In</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trainings.map((training) => (
                <TableRow key={training.training_id}>
                  <TableCell>{training.title}</TableCell>
                  <TableCell>{training.short_title}</TableCell>
                  <TableCell>
                    {training.date_taken ? moment(training.date_taken).format('MM-DD-YYYY') : 'N/A'}
                  </TableCell>
                  <TableCell className={determineDueDateClass(training)}>{calculateDueDate(training)}</TableCell>
                  <TableCell>
                    {displayButton(training) && (
                      <Button
                        data-training_id={training.training_id}
                        data-person_training_id={training.person_training_id}
                        color='primary'
                        variant='outlined'
                        onClick={updateTrainingRecords}>
                        Take Training
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <EditPersonDialog open={dialogIsOpen} handleClose={closeDialog} selectedPerson={person} personId={personId} />
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
}

export default PersonDetailsPage;
