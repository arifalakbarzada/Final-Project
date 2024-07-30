import React from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(4),
    border: '1px solid #000',
    maxWidth: '600px',
    margin: 'auto'
  },
  inputField: {
    marginBottom: theme.spacing(2),
    width: '100%'
  },
  messageField: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  sendButton: {
    alignSelf: 'center',
    backgroundColor: '#000',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#444',
    }
  }
}));

const Contact = () => {
  const classes = useStyles();

  return (
    <Box className={classes.formContainer}>
      <Typography variant="h5" component="h2" gutterBottom>
        Write Us
      </Typography>
      <TextField
        className={classes.inputField}
        label="Name"
        variant="outlined"
        fullWidth
      />
      <TextField
        className={classes.inputField}
        label="Email"
        variant="outlined"
        fullWidth
      />
      <TextField
        className={classes.messageField}
        label="Message"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
      />
      <FormControlLabel
        control={<Checkbox name="robotCheck" color="primary" />}
        label="I am not a robot"
      />
      <Button variant="contained" className={classes.sendButton}>
        Send Message
      </Button>
    </Box>
  );
};

export default Contact;
