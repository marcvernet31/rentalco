import { useNavigate } from 'react-router-dom';

import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import TwoSidedLayout from './TwoSidedLayout';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ArrowForward from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ConstructionIcon from '@mui/icons-material/Construction';

export default function Hero() {
    const navigate = useNavigate();
    return (
        <TwoSidedLayout>
            <Typography
                level="h1"
                fontWeight="xl"
                fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
            >
                Efficient rental contract generation for busy landlords.
            </Typography>
            <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
                Automatize the creation and management of rental contracts with our predefined templetes made by real lawyers.
            </Typography>
            <Card
                variant="outlined"
                color="neutral"
                orientation="horizontal"
                sx={{ gap: 2, my: 1, textAlign: 'left' }}
            >
                <AutoAwesomeIcon color="success" />
                <div>
                <Typography fontSize="xl" fontWeight="lg" sx={{ mb: 1 }}>
                    Beta version is out.
                </Typography>
                <Typography level="body-sm">
                    Start using our tool for free, Luxembourg contracts now available.
                </Typography>
                </div>
            </Card>
            <Button 
                size="lg" 
                endDecorator={<ArrowForward/>} 
                onClick={() => navigate("/app")}
            >
                Get Started
            </Button>
            <Typography>
                Already a member? <Link component="button" onClick={() => navigate("/app")} fontWeight="lg"> Sign in </Link>
            </Typography>
            <Typography
                level="h1"
                startDecorator={<ApartmentIcon />}
                endDecorator={<ConstructionIcon />}
                sx={{
                position: 'absolute',
                top: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                }}
            >
                RentCraft
            </Typography>
        </TwoSidedLayout>
    );
}