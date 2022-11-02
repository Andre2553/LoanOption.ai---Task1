
import { useSelector } from "react-redux";
import { useState } from "react";
import {TableRow,Table,TableBody,TableCell,TableContainer,TableHead,TableFooter, TablePagination}from "@mui/material";

import { IState } from "../../store";
import { IUniversity } from "../../store/modules/table/types";

import styles from './styles.module.css';
import TablePaginationActions from "./TablePaginationActions";
import Row from "./Row";


export default function CollapsibleTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const table = useSelector<IState, IUniversity[]>((state) =>  {return state.table.rows});

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
    <TableContainer className={styles.TableContainer}>
      <Table size='medium' style={{backgroundColor:'#fff',margin: 'auto',width:'95%'}} aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '5%' }}/>
            <TableCell style={{ width: '30%' }}>Name</TableCell>
            <TableCell style={{ width: '10%' }} align="left">Country</TableCell>
            <TableCell style={{ width: '10%' }} align="left">State Province</TableCell>
            <TableCell style={{ width: '25%' }} align="left">Web Pages</TableCell>
            <TableCell style={{ width: '25%' }} align="left">Domains</TableCell>
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
              colSpan={6}
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
