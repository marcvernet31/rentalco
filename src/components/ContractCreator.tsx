import Box from '@mui/joy/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ContractCreatorTool from './ContractCreatorTool';
import { CssVarsProvider } from '@mui/joy/styles/CssVarsProvider';

import Header from './Header';
import Sidebar from './Sidebar';


export default function ContractCreator() {

    return(
        <CssVarsProvider disableTransitionOnChange>        
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                <Header />
                <Sidebar />

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
                    <ContractCreatorTool />
                </Box>
            </Box>
        </CssVarsProvider>
    )
}