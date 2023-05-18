import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import './alert.css';

export default function ErrorAlert(props) {
    const [open, setOpen] = React.useState(false);
    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
                <Alert
                    className='alert'
                    variant='filled'
                    severity='error'
                >
                    {props.message}
                </Alert>
            </Collapse>
        </Box>

      );
}