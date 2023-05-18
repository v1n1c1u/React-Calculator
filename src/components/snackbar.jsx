import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import "./snackbar.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbars(props) {

  const [state, setState] = React.useState({
      open: false,
      vertical: 'top',
      horizontal: 'left',
      message: ""
    });
  const { vertical, horizontal, open, message } = state;

  const handleClose = () => {
      setState({ ...state, open: false });
  };
  React.useEffect(() => {
      document.addEventListener('calculationError', (event) => {
          setState({ open: true, vertical:'top', horizontal: 'left', message:event.detail.message})});
  }, []);
  return (
      <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
          open={open} 
          autoHideDuration={5000} 
          onClose={() => handleClose()}
          >
          <Alert
              className='alert'
              variant='filled'
              severity='error'
              action={
                  <IconButton
                    id="icon-button"
                    aria-label="close"
                    color="inherit"
                    className='close-icon'
                    size="10"
                    onClick={() => handleClose()}
                  >
                    <CloseIcon id="close-icon" fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
                  >
                  {message}
          </Alert>
      </Snackbar>
  );
}