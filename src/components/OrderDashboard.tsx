import * as React from 'react';

import { CssVarsProvider } from '@mui/joy/styles';
import { useNavigate } from "react-router-dom";
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';

import CreateIcon from '@mui/icons-material/Create';

import OrderTable from './OrderTable';
import useScript from '../useScript';
import OrderList from './OrderList';
import Sidebar from './Sidebar';
import Header from './Header';

import { AuthInput } from '../types/AuthInput';

interface OrderDashboardProps extends AuthInput {}

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default function OrderDashboard({signOut, user}: OrderDashboardProps) {

  const status = useScript(`https://unpkg.com/feather-icons`);

  const navigate = useNavigate();

  useEnhancedEffect(() => {
    // Feather icon setup: https://github.com/feathericons/feather#4-replace
    // @ts-expect-error Feather is not yet defined
    if (typeof feather !== 'undefined') {
      // @ts-expect-error Feather is not yet defined
      feather.replace();
    }
  }, [status]);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
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
          <Box
            sx={{
              display: 'flex',
              my: 1,
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="h2">Contracts</Typography>
            <Button
              color="primary"
              startDecorator={<CreateIcon/>}
              size="sm"
              onClick={() => navigate('/create')}
            >
              Create new contract
            </Button>
          </Box>
          <OrderTable user={user} />
          <OrderList />
        </Box>       
      </Box>
    </CssVarsProvider>
  );
}