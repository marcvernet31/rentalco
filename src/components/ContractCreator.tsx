import Box from '@mui/joy/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ContractCreatorTool from './ContractCreatorTool';
import { CssVarsProvider } from '@mui/joy/styles/CssVarsProvider';

import Header from './Header';
import Sidebar from './Sidebar';

import { AuthInput } from '../types/AuthInput';

interface ContractCreatorProps extends AuthInput {}

export default function ContractCreator({signOut, user}: ContractCreatorProps) {

    return(
        <CssVarsProvider disableTransitionOnChange>        
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                <Header />
                <Sidebar signOut={signOut} user={user} />

                <Box
                    component="main"
                    className="MainContent"
                    sx={{
                        pt: {
                        xs: 'calc(12px + var(--Header-height))',
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
                        overflow: 'auto',
                        bgcolor: 'background.body',

                    }}
                >
                    <ContractCreatorTool user={user} />
                </Box>
            </Box>
        </CssVarsProvider>
    )
}