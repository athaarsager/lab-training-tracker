import Typography from '@mui/material/Typography';

const DEFAULT_INSTITUTION_NAME = 'Your Institution Name Here';
function NavBarTitle({ title }) {
  return (
    <Typography sx={{ color: 'white', ml: '.5rem' }} variant='h5'>
      {title ? title : DEFAULT_INSTITUTION_NAME}
    </Typography>
  );
}

export default NavBarTitle;
