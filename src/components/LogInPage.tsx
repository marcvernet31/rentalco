import React from 'react';
import { useNavigate } from 'react-router-dom';

import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import FormControl from '@mui/joy/FormControl';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Link from '@mui/joy/Link';
import Box from '@mui/joy/Box';

import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';

import { LoginPageType } from '../data/LoginPageType';
import ColorSchemeToggle from './ColorSchemeToggle';
import { Constants } from '../utils/Constants';
import GoogleIcon from './GoogleIcon';

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
    firstName: HTMLInputElement;
    lastName:  HTMLInputElement;
    persistent: HTMLInputElement;
  }

interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

export default function LogInPage() {

    const [page, setPage] = React.useState<string | null>(LoginPageType.SignIn);
    const navigate = useNavigate();

    const handleSignIn = (event: React.FormEvent<SignInFormElement>) => {
        event.preventDefault();
        const formElements = event.currentTarget.elements;
        const data = {
            email: formElements.email.value,
            password: formElements.password.value,
            persistent: formElements.persistent.checked,
        };
        console.log(JSON.stringify(data, null, 2));
        navigate('/')
    }

    const handleSignUp = (event: React.FormEvent<SignInFormElement>) => {
        event.preventDefault();
        const formElements = event.currentTarget.elements;
        const data = {
            email: formElements.email.value,
            password: formElements.password.value,
            firstName: formElements.firstName.value,
            lastName: formElements.lastName.value
        };
        console.log(JSON.stringify(data, null, 2));
        navigate('/')
    }

    const SignIn = () => {
        return(
            <>
                <Stack gap={4} sx={{ mb: 2 }}>
                    <Stack gap={1}>
                        <Typography level="h3">Sign in</Typography>
                        <Typography level="body-sm">
                            New to company?{' '}
                            <Link level="title-sm" onClick={() => setPage(LoginPageType.SignUp)}>
                                Sign up!
                            </Link>
                        </Typography>
                    </Stack>
                    <Button
                        variant="soft"
                        color="neutral"
                        fullWidth
                        startDecorator={<GoogleIcon />}
                    >
                        Continue with Google
                    </Button>
                </Stack>
                <Divider
                    sx={(theme) => ({
                    [theme.getColorSchemeSelector('light')]: {
                        color: { xs: '#FFF', md: 'text.tertiary' },
                        '--Divider-lineColor': {
                        xs: '#FFF',
                        md: 'var(--joy-palette-divider)',
                        },
                    },
                    })}
                >
                    or
                </Divider>
                <Stack gap={4} sx={{ mt: 2 }}>
                    <form
                        onSubmit={handleSignIn}
                    >
                        <FormControl required>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" name="email" />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" name="password" />
                        </FormControl>
                        <Stack gap={4} sx={{ mt: 2 }}>
                            <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                            >
                                <Checkbox size="sm" label="Remember me" name="persistent" />
                                <Link level="title-sm" href="#replace-with-a-link">
                                    Forgot your password?
                                </Link>
                            </Box>
                            <Button type="submit" fullWidth >
                                Sign in
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </>
        )
    }

    const SignUp = () => {
        return(
            <>
                <Stack gap={4} sx={{ mb: 2 }}>
                    <Stack gap={1}>
                        <Typography level="h3"> Sign up </Typography>
                        <Typography level="body-sm">
                            Already have an account?{' '}
                            <Link level="title-sm" onClick={() => setPage(LoginPageType.SignIn)}>
                                Sign in!
                            </Link>
                        </Typography>
                    </Stack>

                    <Button
                        variant="soft"
                        color="neutral"
                        fullWidth
                        startDecorator={<GoogleIcon />}
                    >
                        Continue with Google
                    </Button>
                </Stack>
                <Divider
                    sx={(theme) => ({
                    [theme.getColorSchemeSelector('light')]: {
                        color: { xs: '#FFF', md: 'text.tertiary' },
                        '--Divider-lineColor': {
                        xs: '#FFF',
                        md: 'var(--joy-palette-divider)',
                        },
                    },
                    })}
                >
                    or
                </Divider>
                <Stack gap={4} sx={{ mt: 2 }}>
                    <form onSubmit={handleSignUp}>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <FormControl required>
                                <FormLabel> First Name</FormLabel>
                                <Input type="text" name="firstName" />
                            </FormControl>
                            <FormControl required>
                                <FormLabel>Last Name</FormLabel>
                                <Input type="text" name="lastName" />
                            </FormControl>
                        </Stack>
                        <Divider
                            sx={(theme) => ({
                            [theme.getColorSchemeSelector('light')]: {
                                color: { xs: '#FFF', md: 'text.tertiary' },
                                '--Divider-lineColor': {
                                xs: '#FFF',
                                md: 'var(--joy-palette-divider)',
                                },
                            },
                            })}
                        >
                        </Divider>
                        <FormControl required>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" name="email" />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" name="password" />
                        </FormControl>
                        <Button type="submit" fullWidth>
                            Sign up
                        </Button>
                    </form>
                </Stack>
            </>
        )
    }


    return(
        <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
        <CssBaseline />
        <GlobalStyles
          styles={{
            ':root': {
              '--Collapsed-breakpoint': '769px', // form will stretch when viewport is below `769px`
              '--Cover-width': '50vw', // must be `vw` only
              '--Form-maxWidth': '800px',
              '--Transition-duration': '0.4s', // set to `none` to disable transition
            },
          }}
        />
        <Box
          sx={(theme) => ({
            width:
              'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
            transition: 'width var(--Transition-duration)',
            transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(255 255 255 / 0.2)',
            [theme.getColorSchemeSelector('dark')]: {
              backgroundColor: 'rgba(19 19 24 / 0.4)',
            },
          })}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100dvh',
              width:
                'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
              maxWidth: '100%',
              px: 2,
            }}
          >
            <Box
              component="header"
              sx={{
                py: 3,
                display: 'flex',
                alignItems: 'left',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <IconButton variant="soft" color="primary" size="sm">
                  <BadgeRoundedIcon />
                </IconButton>
                <Typography level="title-lg">Company logo</Typography>
              </Box>
              <ColorSchemeToggle />
            </Box>
            <Box
              component="main"
              sx={{
                my: 'auto',
                py: 2,
                pb: 5,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: 400,
                maxWidth: '100%',
                mx: 'auto',
                borderRadius: 'sm',
                '& form': {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                },
                [`& .${formLabelClasses.asterisk}`]: {
                  visibility: 'hidden',
                },
              }}
            >
                {page == LoginPageType.SignIn ? SignIn() : SignUp()}
            </Box>
            <Box component="footer" sx={{py: 3 }}>
              <Typography level="body-xs" textAlign="center">
                © Your company {new Date().getFullYear()}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={(theme) => ({
            height: '100%',
            position: 'fixed',
            right: 0,
            top: 0,
            bottom: 0,
            left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
            transition:
              'background-image var(--Transition-duration), left var(--Transition-duration) !important',
            transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
            backgroundColor: 'background.level1',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${Constants.lightLoginImageURL})`,
            [theme.getColorSchemeSelector('dark')]: {
              backgroundImage:`url(${Constants.darkLoginImageURL})`
            },
          })}
        />
      </CssVarsProvider>
    )
}