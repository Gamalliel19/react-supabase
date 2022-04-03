import React, { useRef } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { supabaseClient } from '../api/supabaseClient';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom'; // use RouterLink as alias for react-router-dom's Link component so that the names don't collide.

// from https://emailregex.com/
// used at (4) for pattern based validation to make sure we are getting an email
const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

// password must contains at least 8 characters including big letter, small letter, numbers and symbols
// const passwordRegex =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}/;

const useStyles = makeStyles((theme) => ({
  form: {
    width: 300,
    margin: '2em 0 0 0',
    '& > div': {
      margin: '0.6em 0 0.6em 0',
    },
  },
  paper: {
    margin: '4em 0 0 0',
    padding: '6em 0 10em 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export const SignUpPages = () => {
  const redirectUri = new URLSearchParams(window.location.search).get(
    'redirectUri'
  );
  const classes = useStyles();

  // Langkah 1 adalah memanggil properti yang kita butuhkan dari useForm
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //Langkah 2
  // menggunakan fungsi watch untuk melihat password yang dimasukkan oleh pengguna
  const password = watch('password');

  const onSubmit = ({ email, password }: any) => {
    supabaseClient.auth
      .signUp({
        email,
        password,
      })
      .then((res) => {
        console.log(res.user);
        alert('Signed up successfully! Check your email!');
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <Paper variant='outlined' className={classes.paper}>
      <Typography variant='h5' align='center'>
        Sign up to SupaTwitter!
      </Typography>
      <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
        <div>
          <TextField
            {...register('email', {
              required: 'You must provide an email',
              pattern: emailRegex,
            })}
            error={!!errors.email}
            helperText={errors?.email?.message}
            label='Email'
            type='email'
            autoComplete='email'
            variant='outlined'
            fullWidth
          />
        </div>
        <div>
          <TextField
            {...register('password', {
              required: 'You must specify a password',
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters',
              },
            })}
            error={!!errors.password}
            helperText={errors?.password?.message}
            label='Password'
            type='password'
            autoComplete='new-password'
            variant='outlined'
            fullWidth
          />
        </div>
        <div>
          <TextField
            {...register('passwordConfirm', {
              validate: (value) =>
                value === password || 'The passwords do not match',
            })}
            error={!!errors.passwordConfirm}
            helperText={errors?.passwordConfirm?.message}
            label='Confirm Password'
            type='password'
            autoComplete='new-password'
            variant='outlined'
            fullWidth
          />
        </div>

        <Button
          type='submit'
          onClick={handleSubmit(onSubmit)}
          variant='contained'
          color='primary'
          disableElevation
          fullWidth
          size='large'
        >
          Sign up
        </Button>
      </form>
    </Paper>
  );
};
