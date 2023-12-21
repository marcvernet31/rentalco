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

import { AuthUser } from "aws-amplify/auth";
import { PDFDownloadLink } from '@react-pdf/renderer';

import uuidv4 from '../utils/uuidv4';
import ContractInput from '../types/ContractInput';
import DynamodbReader from '../aws/DynamodbReader';
import { ContractType } from '../data/ContractType';
import ApartmentRental from '../templates/ApartmentRental';
import { ContractCreationStatus } from '../data/ContractCreationStatus';


interface ContractCreatorToolProps {
    user:  AuthUser | undefined;
}

const defaultContractName = "contract_name"
const clausuleDefaultPlaceholder = "The tenant needs to open the windows of the room every morning for at least 15 minutes to follow the german Stoßlüften tradition. (not a joke)"
const defaultContractInput: ContractInput = {
    UUID: "",
    userId: "unknown",
    contractType: ContractType.Other,
    contractName: defaultContractName,
    creationDate: "",
    landlordInfo: {
        firstName: "",
        lastName: "",
        phoneNumber: undefined, 
        email: undefined
    }, 
    tenantInfo: {
        firstName: "",
        lastName: "",
        phoneNumber: undefined, 
        email: undefined
    }, 
    additionalClausules: []
}

export default function ContractCreatorTool({user}: ContractCreatorToolProps) {
    
    const [contractInput, setContractInput] = React.useState<ContractInput>(defaultContractInput);
    const [newClausuleText, setNewClausleText] = React.useState<string>(clausuleDefaultPlaceholder);
    const [creationStatus, setCreationStatus] = React.useState<string>(ContractCreationStatus.Writting);

    const isValidatedInput = () => {
        return contractInput.contractName != "" 
            && contractInput.landlordInfo.firstName != "" 
            && contractInput.landlordInfo.lastName != ""
            && contractInput.tenantInfo.firstName != ""
            && contractInput.tenantInfo.lastName != ""
    }

    const navigate = useNavigate();

    const contractsDB = new DynamodbReader("rentalco-contracts")

    const todayDate = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
    });

    const createContract = () => {
        // TODO: Add validation for obligatory parameters
        const contractPayload: ContractInput = contractInput
        contractPayload.UUID = uuidv4()
        contractPayload.userId = user?.userId || "unknown"
        contractPayload.creationDate = todayDate

        setCreationStatus(ContractCreationStatus.Building)
        // TODO: handle success or error and show on UI
        contractsDB.putDocument(contractPayload)
        setCreationStatus(ContractCreationStatus.Done)
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
                                setContractInput({...contractInput, additionalClausules: contractInput.additionalClausules.slice(0,index).concat(contractInput.additionalClausules.splice(index+1))})
                            }}
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
                    setContractInput({...contractInput, additionalClausules: [...contractInput.additionalClausules, newClausuleText]})
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

    const AdditionalConditionsCard = () => {
        return(
            <Card>
                <Box sx={{ mb: 1 }}>
                    <Typography level="title-md"> Other things </Typography>
                    <Typography level="body-sm">
                        Some other things
                    </Typography>
                </Box> 
                <Divider />
                <Stack
                    direction="row"
                    spacing={3}
                    sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                >
                    <Stack spacing={2} sx={{ flexGrow: 1 }} >
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

    const ContractNameCard = () => {
        return(
            <Card>
                <Box sx={{ mb: 1 }}>
                    <Typography level="title-md"> Contract Name</Typography>
                    <Typography level="body-sm">
                        Enter name by which you want to identify this contract
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
                            <FormLabel>Name*</FormLabel>
                            <FormControl
                                sx={{
                                    display: {
                                    sm: 'flex-column',
                                    md: 'flex-row',
                                    },
                                    gap: 2,
                                }}
                            >
                                 <Input size="sm" placeholder="Contract name"
                                        onChange={(event) => 
                                            setContractInput(
                                                {
                                                    ...contractInput, 
                                                    contractName: event.target.value
                                                }
                                            )
                                        }
                                    />
                            </FormControl>
                        </Stack>
                </Stack>
            </Stack>
        </Card>
        )
    }


    const TenantInfoCard = () => {
        return(
            <Card>
                <Box sx={{ mb: 1 }}>
                    <Typography level="title-md">Tenant general info</Typography>
                    <Typography level="body-sm">
                        Enter basic information for the contract
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
                            <FormLabel>Name*</FormLabel>
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
                                    <Input size="sm" placeholder="First name" 
                                        onChange={(event) => 
                                            setContractInput(
                                                {
                                                    ...contractInput, 
                                                    tenantInfo: {...contractInput.tenantInfo, firstName: event.target.value}
                                                }
                                            )
                                        }
                                    />
                                    <Input size="sm" placeholder="Last name" sx={{ flexGrow: 1 }} 
                                        onChange={(event) => 
                                            setContractInput(
                                                {
                                                    ...contractInput, 
                                                    tenantInfo: {...contractInput.tenantInfo, lastName: event.target.value}
                                                }
                                            )
                                        }
                                    />
                                </Stack>
                            </FormControl>
                        </Stack>
                    <Stack direction="row" spacing={2}>
                        <FormControl>
                            <FormLabel> Phone Number </FormLabel>
                            <Input size="sm" placeholder="+352 ..." 
                                onChange={(event) => 
                                    setContractInput(
                                        {
                                            ...contractInput, 
                                            tenantInfo: {...contractInput.tenantInfo, phoneNumber: event.target.value}
                                        }
                                    )
                                }
                            />
                        </FormControl>
                        <FormControl sx={{ flexGrow: 1 }}>
                            <FormLabel>Email*</FormLabel>
                            <Input
                                size="sm"
                                type="email"
                                startDecorator={<EmailRoundedIcon />}
                                placeholder="example@email.com"
                                sx={{ flexGrow: 1 }}
                                onChange={(event) => 
                                    setContractInput(
                                        {
                                            ...contractInput, 
                                            tenantInfo: {...contractInput.tenantInfo, email: event.target.value}
                                        }
                                    )
                                }
                            />
                        </FormControl>
                    </Stack>
                </Stack>
            </Stack>
        </Card>
        )
    }

    const LandlordInfoCard = () => {
        // TODO: autogenerate defaults from user profile
        return(
            <Card>
                <Box sx={{ mb: 1 }}>
                    <Typography level="title-md">Landlord general info</Typography>
                    <Typography level="body-sm">
                        Enter basic information for the contract
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
                            <FormLabel>Name*</FormLabel>
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
                                    <Input size="sm" placeholder="First name" 
                                        onChange={(event) => 
                                            setContractInput(
                                                {
                                                    ...contractInput, 
                                                    landlordInfo: {...contractInput.landlordInfo, firstName: event.target.value}
                                                }
                                            )
                                        }
                                    />
                                    <Input size="sm" placeholder="Last name" sx={{ flexGrow: 1 }} 
                                        onChange={(event) => 
                                            setContractInput(
                                                {
                                                    ...contractInput, 
                                                    landlordInfo: {...contractInput.landlordInfo, lastName: event.target.value}
                                                }
                                            )
                                        }
                                    />
                                </Stack>
                            </FormControl>
                        </Stack>
                    <Stack direction="row" spacing={2}>
                        <FormControl>
                            <FormLabel> Phone Number </FormLabel>
                            <Input size="sm" placeholder="+352 ..." 
                                onChange={(event) => 
                                    setContractInput(
                                        {
                                            ...contractInput, 
                                            landlordInfo: {...contractInput.landlordInfo, phoneNumber: event.target.value}
                                        }
                                    )
                                }
                            />
                        </FormControl>
                        <FormControl sx={{ flexGrow: 1 }}>
                            <FormLabel>Email*</FormLabel>
                            <Input
                                size="sm"
                                type="email"
                                startDecorator={<EmailRoundedIcon />}
                                placeholder="example@email.com"
                                sx={{ flexGrow: 1 }}
                                onChange={(event) => 
                                    setContractInput(
                                        {
                                            ...contractInput, 
                                            landlordInfo: {...contractInput.landlordInfo, email: event.target.value}
                                        }
                                    )
                                }
                            />
                        </FormControl>
                    </Stack>
                    <div></div>
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
                                    isValidatedInput() &&
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
                        <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={1} onChange={() => console.log("room")}>
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
                        {ContractNameCard()}
                        {LandlordInfoCard()}
                        {TenantInfoCard()}
                        {DateRangeCard()}
                        {contractInput.additionalClausules.map((clausule, index) => Clausule(clausule, index))}
                        {AdditionalTextCard()}
                        {AdditionalConditionsCard()}
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