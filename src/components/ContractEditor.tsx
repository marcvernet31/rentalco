import { CssVarsProvider } from '@mui/joy/styles';

import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import Sidebar from './Sidebar';

export default function ContractEditor() {
    return(
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                <Sidebar />
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
                    <h1> Edit Your contract here </h1>
                </Box>
            </Box>
        </CssVarsProvider>
    )
}