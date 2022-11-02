
import {Paper,Typography,TableRow,Box,Collapse,IconButton,Table,TableBody,TableCell,TableContainer,TableHead,TableFooter, TablePagination}from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSelector } from "react-redux";
import { IState } from "../../store";
import { IUniversity } from "../../store/modules/table/types";
import { Fragment, useState } from "react";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function Row(props: {row: IUniversity}){
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {(row.domains.length > 1 || row.web_pages.length > 1)? open?<KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />:null}
          </IconButton>
        </TableCell>
        <TableCell  component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.country}</TableCell>
        <TableCell align='left' size="small">{row.state_province}</TableCell>
        <TableCell align="left"><span>{row.web_pages.length}</span> {row.web_pages[0]}</TableCell>
        <TableCell align="left"><span>{row.domains.length}</span> {row.domains[0]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Domains & Web pages
              </Typography>
              <Table size="small" aria-label="info">
                <TableHead>
                  <TableRow>
                    <TableCell>Domains</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.domains.map((d,idx) => (
                    <TableRow key={idx}>
                      <TableCell component="th" scope="row">
                        {d}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Table style={{ paddingBottom: 0, marginTop: "20px" }}size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell >Web pages</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.web_pages.map((d,idx) => (
                    <TableRow key={idx}>
                      <TableCell component="th" scope="row">
                        {d}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function CollapsibleTable() {
  const table = useSelector<IState, IUniversity[]>((state) =>  {return state.table.rows});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - table.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer style={{ backgroundColor:'#fff',paddingBottom: 0, paddingTop: 0 }}>
      <Table size='medium' style={{margin: 'auto',width:'80%'}} aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '5%' }}/>
            <TableCell style={{ width: '30%' }}>Name</TableCell>
            <TableCell style={{ width: '10%' }} align="left">Country</TableCell>
            <TableCell style={{ width: '10%' }}align="left">State Province</TableCell>
            <TableCell style={{ width: '25%' }}align="left">Web Pages</TableCell>
            <TableCell style={{ width: '25%' }}align="left">Domains</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? table.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : table
          ).map((row,idx) => (
            <Row key={idx} row={row} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={table.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
