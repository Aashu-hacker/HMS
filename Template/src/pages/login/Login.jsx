import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import style from './Login.module.css';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import REACT_APP_BASE_URL from "../../API/api";
import { useToast } from '@chakra-ui/react';
import { pink } from '@mui/material/colors';
import { Checkbox, TextField } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    imgPath:
      'https://templates.iqonic.design/xray/html/images/login/3.png'
  },
  {
    imgPath:
      'https://templates.iqonic.design/xray/html/images/login/1.png',
  },
  {
    imgPath:
      'https://templates.iqonic.design/xray/html/images/login/2.png',
  },

];

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast()
  const theme = useTheme();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast({
        title: 'Password Error',
        description: 'Password must be at least 8 characters long.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top"
      });
      return;
    }

    try {
      const response = await fetch(`${REACT_APP_BASE_URL}admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        toast({
          title: 'Login Successful',
          description: data.msg,
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: "top"
        });
        setTimeout(() => {
          window.location.href = "/dashboard_a";
        }, 2000);
        localStorage.setItem("loginToken", data.token)
        localStorage.setItem("loginName", data.Name)
        localStorage.setItem("loginEmail", data.Email)
        setEmail('');
        setPassword('');
      } else {
        toast({
          title: 'Login Error',
          description: 'Invalid email or password',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      }
    } catch (error) {
      toast({
        title: 'Server Error',
        description: 'Try after sometime!!',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    }
  };

  return (
    <div className={style.login_template}>
      <div className={style.login}>
        <Box sx={{ maxWidth: 400, flexGrow: 1 }} className='login_box'>
          <Paper
            square
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 50,
              pl: 2,
              background: 'transparent',
            }}
          >
            <Typography>{images[activeStep].label}</Typography>
          </Paper>
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((step, index) => (
              <div key={step.label} className={style.login_slider}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: 255,
                      display: 'block',
                      maxWidth: 400,
                      overflow: 'hidden',
                      width: '100%',
                      borderRadius: '22px',
                    }}
                    src={step.imgPath}
                    alt={step.label}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: 'none',
              padding: '20px',
            }}
          />
        </Box>
      </div>
      <div className={style.login_form}>
        <h1>Sign in</h1>
        <p>Enter your email address and password to access the admin panel.</p>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            name="email"
            margin="normal"
            required
            onChange={handleEmailChange}
          />
          <TextField
            fullWidth
            type="password"
            margin="normal"
            label="Password"
            variant="outlined"
            value={password}
            required
            name="password"
            onChange={handlePasswordChange}
          />
          {/* <div className={style.form_group}>
            <div className={style.checkbox}>
              <label>
                <input type="checkbox" /> Remember me
              </label>
            </div>
          </div> */}
          <button type="submit" className={style.btn}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
