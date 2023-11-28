import { CssVarsProvider } from '@mui/joy/styles';

import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import Sidebar from './Sidebar';

import { AuthInput } from '../types/AuthInput';

interface SupportProps extends AuthInput {}

export default function Support({signOut, user}: SupportProps) {
    return(
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                <Sidebar signOut={signOut} user={user} />
                <Box
                    component="main"
                    className="MainContent"
                    sx={{
                        px: {
                        xs: 2,
                        md: 6,
                        },
                        pt: {
                        xs: 'calc(12px + var(--Header-height))',
                        sm: 'calc(12px + var(--Header-height))',
                        md: 3,
                        },
                        pb: {
                        xs: 2,
                        sm: 2,
                        md: 3,
                        },
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        height: '100dvh',
                        gap: 1,
                    }}
                >
                    <h1> Support </h1>
                </Box>
            </Box>
        </CssVarsProvider>
    )
}