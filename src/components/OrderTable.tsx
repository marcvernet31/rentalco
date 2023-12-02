import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';

import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Chip from '@mui/joy/Chip';
import Menu from '@mui/joy/Menu';
import Modal from '@mui/joy/Modal';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import FormLabel from '@mui/joy/FormLabel';
import MenuButton from '@mui/joy/MenuButton';
import Typography from '@mui/joy/Typography';
import ModalDialog from '@mui/joy/ModalDialog';
import FormControl from '@mui/joy/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';

import HouseIcon from '@mui/icons-material/House';
import SearchIcon from '@mui/icons-material/Search';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import type { Order } from "../types/Order";
import { SortUtils } from '../utils/SortUtils';
import ApartmentRental from '../templates/ApartmentRental';
import ContractTableReader from '../aws/ContractTableReader';

import { AuthUser } from "aws-amplify/auth";
import { ItemList } from 'aws-sdk/clients/dynamodb';

interface OrderTableProps {
  user: AuthUser | undefined;
}

interface TenantInfo {
  firstName: string,
  lastName: string,
  phoneNumber: string | null, 
  email: string | null
}

interface Row {
  id: string,
  contractName: string,
  date: string,
  type: string,
  tenant: {
    initial: string,
    name: string,
    email: string,
  },
}

export default function OrderTable({user}: OrderTableProps) {
  const [rename, setRename] = React.useState<string>('');
  const [order, setOrder] = React.useState<Order>('desc');  
  const [openLogout, setOpenLogout] = React.useState(false);
  const [searchBar, setSearchBar]  = React.useState<string>('');
  const [contractsFromDB, setContractsFromDB] = React.useState<Row[]>([]);
  const [selectedContract, setSelectedContract] = React.useState<string>('');
  const [openDeleteContract, setOpenDeleteContract] = React.useState(false);
  const [openRenameContract, setOpenRenameContract] = React.useState(false);
  const [contractType, setContractType] = React.useState<string | null>('all');
  const [selectedTenant, setSelectedTenant] = React.useState<string | null>('all');

  React.useEffect(() => { getContractsFromDB() }, [setContractsFromDB])

  const contractTable = new ContractTableReader(); 
  const navigate = useNavigate();

  const getTenantsFromContracts = function() {
    return contractsFromDB.map((row) => {return row.tenant.name})
  }

  const mapRowsFromContracts = function(data: ItemList): Row[] {
    return data!.map((item) => {
      const tenantInfo: TenantInfo = item.tenantInfo as TenantInfo
      return {
        id: item.UUID.toString(),
        contractName: item.contractName.toString(),
        date: 'Feb 3, 2023',
        type: item.contractType.toString(),
        tenant: {
          initial: tenantInfo.firstName[0],
          name: `${tenantInfo.firstName} ${tenantInfo.lastName}`,
          email: tenantInfo.email || 'example@gmail.com',
        },
      };
    })
  }

  const getContractsFromDB = () => {
    contractTable.queryByUserId(user?.userId || "", function(err, data) {
      if (err) {
        console.error(err);
      } else {
        const rowsFromContracts = mapRowsFromContracts(data!)
        setContractsFromDB(rowsFromContracts)
      }})
  }

  const LogoutModal = () => {
    return(
      <Modal open={openLogout} onClose={() => setOpenLogout(false)}>
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only('xs')]: {
              top: 'unset',
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: 'none',
              maxWidth: 'unset',
            },
          })}
        >
          <Typography id="nested-modal-title" level="h2">
            Are you absolutely sure?
          </Typography>
          <Typography id="nested-modal-description" textColor="text.tertiary">
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </Typography>
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' },
            }}
          >
            <Button variant="solid" color="primary" onClick={() => navigate("/login")}>
              Log Out
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setOpenLogout(false)}
            >
              Cancel
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    )
  }

  const RenameContractModal = () => {
    return(
      <Modal open={openRenameContract} onClose={() => setOpenRenameContract(false)}>
      <ModalDialog>
        <DialogTitle> Rename contract </DialogTitle>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>New name</FormLabel>
              <Input autoFocus required onChange={(event) => setRename(event.target.value)} />
            </FormControl>
            <Button type="submit" 
            onClick={
              () => {
                contractTable.updateContractName(selectedContract, rename)
                setOpenRenameContract(false);
              }
            }
            >Rename</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
    )
  }

  const DeleteContractModal = () => {

    return(
      <Modal open={openDeleteContract} onClose={() => setOpenDeleteContract(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to delete this contract?
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={() => setOpenDeleteContract(false)}>
              Delete
            </Button>
            <Button variant="plain" color="neutral" onClick={() => setOpenDeleteContract(false)}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    )
  }

  const RowMenu: React.FC<{rowId: string}> = ({rowId}) => {
    // TODO: Add user notification when succesfully renamed
    return (
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
        >
          <MoreHorizRoundedIcon />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 140 }}>
          <MenuItem onClick={() => navigate("/edit")}>Edit</MenuItem>
          <MenuItem 
            onClick={() => {
                setSelectedContract(rowId)
                setOpenRenameContract(true)
              }
            }
          >
            Rename
          </MenuItem>
          <Divider />
          <MenuItem color="danger" onClick={() => setOpenDeleteContract(true)} >
            Delete
          </MenuItem>
        </Menu>
      </Dropdown>
    );
  }

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Contract Type</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by type"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        >
          <Option value="roomRental" onClick={() => setContractType("roomRental")}>Room rental</Option>
          <Option value="apartmentRental" onClick={() => setContractType("apartmentRental")}>Apartment rental</Option>
          <Option value="other" onClick={() => setContractType("other")}>Other</Option>
          <Option value="all" onClick={() => setContractType("all")}>All</Option>
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Tenant</FormLabel>
        <Select size="sm" placeholder="All" >
          <Option value="all"  onClick={() => setSelectedTenant('all')}>All</Option>
          {getTenantsFromContracts().map((c) => 
            <Option value={c} onClick={() => setSelectedTenant(c)}> {c} </Option>
          )}
        </Select>
      </FormControl>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {LogoutModal()}
      {DeleteContractModal()}
      {RenameContractModal()}
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: {
            xs: 'none',
            sm: 'flex',
          },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: {
              xs: '120px',
              md: '160px',
            },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm" >
          <FormLabel>Search for contract</FormLabel>
          <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />}
            onChange={(event) => {
              event.preventDefault();
              setSearchBar(event.target.value)
            }}
          />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>

              </th>
              <th style={{ width: 120, padding: '12px 6px' }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform:
                        order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                    },
                  }}
                >
                  Invoice
                </Link>
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>Date</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Contract Type</th>
              <th style={{ width: 240, padding: '12px 6px' }}>Tenant</th>
              <th style={{ width: 140, padding: '12px 6px' }}> </th>
            </tr>
          </thead>
          <tbody>
            {SortUtils.stableSort(contractsFromDB, SortUtils.getComparator(order, 'id'))
            .filter((row) => row.contractName.toLowerCase().includes(searchBar.toLowerCase()))
            .filter((row) => contractType == 'all' ? true : row.type == contractType)
            .filter((row) => selectedTenant == 'all' ? true : row.tenant.name == selectedTenant)
            .map((row) => (
              <tr key={row.contractName}>
                <td style={{ textAlign: 'center', width: 120 }}>
                </td>
                <td>
                  <Typography level="body-xs">{row.contractName}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row.date}</Typography>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        apartmentRental: <HouseIcon/>,
                        roomRental: <BedroomChildIcon/>,
                        other: <QuestionMarkIcon />
                      }[row.type]
                    }
                  >
                    {row.type}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar size="sm">{row.tenant.initial}</Avatar>
                    <div>
                      <Typography level="body-xs">{row.tenant.name}</Typography>
                      <Typography level="body-xs">{row.tenant.email}</Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Link level="body-xs" component="button">
                      <PDFDownloadLink document={<ApartmentRental />} fileName={`${row.id}.pdf`}>

                      <Typography level="body-xs" color="primary"> Download </Typography>
                      </PDFDownloadLink>
                    </Link>
                    <RowMenu rowId={row.id}/>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? 'outlined' : 'plain'}
            color="neutral"
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}
