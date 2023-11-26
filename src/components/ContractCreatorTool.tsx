import React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/joy/Box';
import Tabs from '@mui/joy/Tabs';
import Card from '@mui/joy/Card';
import Alert from '@mui/joy/Alert';
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import TabList from '@mui/joy/TabList';
import Textarea from '@mui/joy/Textarea';
import Checkbox from '@mui/joy/Checkbox';
import FormLabel from '@mui/joy/FormLabel';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import FormControl from '@mui/joy/FormControl';
import AspectRatio from '@mui/joy/AspectRatio';
import Tab, { tabClasses } from '@mui/joy/Tab';
import CardActions from '@mui/joy/CardActions';
import InfoIcon from '@mui/icons-material/Info';
import CardOverflow from '@mui/joy/CardOverflow';
import FormHelperText from '@mui/joy/FormHelperText';
import LinearProgress from '@mui/joy/LinearProgress';

import HomeIcon from '@mui/icons-material/Home';
import DownloadIcon from '@mui/icons-material/Download';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

import { ContractCreationStatus } from '../data/ContractCreationStatus';
import { PDFDownloadLink } from '@react-pdf/renderer';

import ApartmentRental from '../templates/ApartmentRental';


export default function ContractCreatorTool() {
    const clausuleDefaultPlaceholder = "The tenant needs to open the windows of the room every morning for at least 15 minutes to follow the german Stoßlüften tradition. (not a joke)"
    
    const [savedClausules, setSavedClausules] = React.useState<string[]>([])
    const [newClausuleText, setNewClausleText] = React.useState<string>(clausuleDefaultPlaceholder)
    const [creationStatus, setCreationStatus] = React.useState<string>(ContractCreationStatus.Writting)

    const navigate = useNavigate();

    const createContract = () => {
        setCreationStatus(ContractCreationStatus.Building)
        setTimeout(() => {
            setCreationStatus(ContractCreationStatus.Done)
        }, 1000);
          
    }

    const InformationMessage = () => {
        return(
            <Alert
                size="lg"
                color="primary"
                variant="solid"
                invertedColors
                startDecorator={
                    <AspectRatio
                        variant="solid"
                        ratio="1"
                        sx={{
                            minWidth: 40,
                            borderRadius: '50%',
                            boxShadow: '0 2px 12px 0 rgb(0 0 0/0.2)',
                        }}
                    >
                        <div>
                            <InfoIcon />
                        </div>
                    </AspectRatio>
                }
                sx={{ alignItems: 'flex-start', overflow: 'hidden' }}
            >
                <div>
                    <Typography level="title-lg"> Building ... </Typography>
                    <Typography level="body-sm">
                        Success is walking from failure to failure with no loss of enthusiam.
                    </Typography>
                </div>
                <LinearProgress
                    variant="solid"
                    value={40}
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        borderRadius: 0,
                    }}
                />
          </Alert>
        )
    }
    
    const SuccessMessage = () => {
        return(
            <Alert
                variant="soft"
                color="success"
                invertedColors
                sx={{ alignItems: 'flex-start', gap: '1rem' }}
                startDecorator={
                    <AspectRatio
                        variant="solid"
                        ratio="1"
                        sx={{
                            minWidth: 40,
                            borderRadius: '50%',
                            boxShadow: '0 2px 12px 0 rgb(0 0 0/0.2)',
                        }}
                    >
                        <div> <Check/> </div>
                    </AspectRatio> 
                }
            >
                <Box sx={{ flex: 1 }}>
                    <Typography level="title-md"> Success!</Typography>
                    <Typography level="body-md">
                        Your contract has been correctly generated and saved 
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button 
                            variant="outlined" 
                            size="sm"                                 
                            startDecorator={<HomeIcon/>}
                            onClick={() => navigate("/")}
                        >
                            Return Home
                        </Button>
                        <Button 
                            variant="solid" 
                            size="sm"                                 
                            startDecorator={<DownloadIcon/>}
                        >
                            <PDFDownloadLink document={<ApartmentRental/>} fileName={"yourContract.pdf"}>
                                Download Contract
                            </PDFDownloadLink>
                        </Button>
                    </Box>
                </Box>
            </Alert>
        )
    }

    const Clausule = (text: string, index: number) => {
        return(
            <Card>        
                <Box sx={{ mb: 1 }}>
                    <Typography level="title-md"> Clausule {index+1}</Typography>
                    <Typography level="body-sm"> {text} </Typography>
                </Box>
                <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                    <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                        <Button size="sm" color="danger" variant="solid"
                            onClick={() => {
                                setSavedClausules(savedClausules.slice(0,index).concat(savedClausules.splice(index+1)))}}
                        >
                            Remove clausule
                        </Button>
                    </CardActions>
                </CardOverflow>
            </Card>
        )
    }

    const AdditionalTextCard = () => {
        return(
            <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md"> Add an additional clausule</Typography>
            <Typography level="body-sm">
              Add additional clausules to be defined in the contract
            </Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
            <Textarea
              size="sm"
              minRows={4}
              sx={{ mt: 1.5 }}
              onChange={(event) => setNewClausleText(event.target.value)}
              defaultValue={clausuleDefaultPlaceholder}
            />
            <FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
              275 characters left
            </FormHelperText>
          </Stack>
          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button size="sm" variant="solid" 
                onClick={() => {
                    setSavedClausules([...savedClausules, newClausuleText])
                    setNewClausleText(clausuleDefaultPlaceholder)
                }}
              >
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
        )
    }

    // TODO: Solve date picker dependency issue
    // https://mui.com/x/react-date-pickers/date-range-picker/
    const DateRangeCard = () => {
        return(
            <Card>
                <Box sx={{ mb: 1 }}>
                    <Typography level="title-md"> Contract dates</Typography>
                    <Typography level="body-sm">
                        Enter contract duration dates
                    </Typography>
                </Box>
                <Divider />
            </Card> 
        )
    }

    const TenantInfoCard = () => {
        return(
            <Card>
                <Box sx={{ mb: 1 }}>
                    <Typography level="title-md">Tenant general info</Typography>
                    <Typography level="body-sm">
                        Enter basic info for the contract bla bla bla
                    </Typography>
                </Box> 
                <Divider />

                <Stack
                    direction="row"
                    spacing={3}
                    sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                >
                    <Stack direction="column" spacing={1}></Stack>
                    <Stack spacing={2} sx={{ flexGrow: 1 }} >
                        <Stack spacing={1}>
                            <FormLabel>Name</FormLabel>
                            <FormControl
                                sx={{
                                    display: {
                                    sm: 'flex-column',
                                    md: 'flex-row',
                                    },
                                    gap: 2,
                                }}
                            >
                                <Stack  direction="row" sx={{ gap: 2}}>
                                    <Input size="sm" placeholder="First name" />
                                    <Input size="sm" placeholder="Last name" sx={{ flexGrow: 1 }} />
                                </Stack>

                            </FormControl>
                        </Stack>
                    <Stack direction="row" spacing={2}>
                        <FormControl>
                            <FormLabel>Role</FormLabel>
                            <Input size="sm" defaultValue="UI Developer" />
                        </FormControl>
                        <FormControl sx={{ flexGrow: 1 }}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                size="sm"
                                type="email"
                                startDecorator={<EmailRoundedIcon />}
                                placeholder="email"
                                defaultValue="siriwatk@test.com"
                                sx={{ flexGrow: 1 }}
                            />
                        </FormControl>
                    </Stack>
                    <div></div>
                    <div>
                        <FormControl sx={{ display: { sm: 'contents' } }}>
                            <FormLabel> Additional conditions</FormLabel>
                                <Stack spacing={1}>
                                    <Checkbox label="Add condition for X thing"/>
                                    <Checkbox label="Add condition for Y thing"/>
                            </Stack>
                        </FormControl>
                    </div>
                </Stack>
            </Stack>
        </Card>
        )
    }

    return(

        <Box
            sx={{
            flex: 1,
            width: '100%',
            bgcolor: 'background.body',
            }}
        > 
            <Box
                sx={{
                position: 'sticky',
                top: {
                    sm: -100,
                    md: -110,
                },
                bgcolor: 'background.body',
                zIndex: 9995,
                }}
            >
                <Box
                    sx={{
                        px: {
                        xs: 2,
                        md: 6,
                        },
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
                        <Typography
                            level="h2"
                            sx={{
                            mt: 1,
                            mb: 2,
                            }}
                        >
                            Create new contract
                        </Typography>
                            <Button
                                color="success"
                                startDecorator={<DoneOutlineIcon/>}
                                size="sm"
                                onClick={() => createContract()}
                                disabled = {
                                    creationStatus == ContractCreationStatus.Writting ? false : true
                                }
                            >
                                Save contract
                            </Button>
                    </Box>

                </Box>
                <Tabs
                    defaultValue={0}
                    sx={{
                        bgcolor: 'transparent',
                    }}
                >
                    <TabList
                        tabFlex={1}
                        size="sm"
                        sx={{
                        pl: {
                            xs: 0,
                            md: 4,
                        },
                        justifyContent: 'left',
                        [`&& .${tabClasses.root}`]: {
                            flex: 'initial',
                            bgcolor: 'transparent',
                            [`&.${tabClasses.selected}`]: {
                            fontWeight: '600',
                            '&::after': {
                                height: '2px',
                                bgcolor: 'primary.500',
                            },
                            },
                        },
                        }}
                    >
                        <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={0}>
                        Apartment rental
                        </Tab>
                        <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={1}>
                        Room rental
                        </Tab>
                    </TabList>
                </Tabs>
            </Box>
            <Stack
                spacing={4}
                sx={{
                display: 'flex',
                maxWidth: '800px',
                mx: 'auto',
                px: {
                    xs: 2,
                    md: 6,
                },
                py: {
                    xs: 2,
                    md: 3,
                },
                }}
            >
                {creationStatus == ContractCreationStatus.Writting ?
                    <>
                        {TenantInfoCard()}
                        {DateRangeCard()}
                        {savedClausules.map((clausule, index) => Clausule(clausule, index))}
                        {AdditionalTextCard()}
                    </> : <></>
                }
                {creationStatus == ContractCreationStatus.Done ? 
                    <>                
                        {SuccessMessage()}
                    </> : <></>    
                }
                {creationStatus == ContractCreationStatus.Building ? 
                    <>                
                        {InformationMessage()}
                    </> : <></>    
                }
            </Stack>
        </Box>

    )
}