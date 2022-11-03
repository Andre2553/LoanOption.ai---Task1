
import {Typography,TableRow,Box,Collapse,IconButton,Table,TableBody,TableCell,TableHead}from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fragment, useState } from "react";
import { IUniversity } from "../../../store/modules/table/types";
import styles from '../styles.module.css';
export default function Row(props: {row: IUniversity}){
   const { row } = props;
   const [open, setOpen] = useState(false);
 
   return (
     <Fragment >
       <TableRow  sx={{ '& > *': { borderBottom: 'unset' } }}>
         <TableCell >
           <IconButton
             aria-label="expand row"
             size="small"
             onClick={() => setOpen(!open)}
           >
             {(row.domains.length > 1 || row.web_pages.length > 1)? open?<KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />:null}
           </IconButton>
         </TableCell>
         <TableCell style={{fontWeight: 'bold'}}  component="th" scope="row">
           {row.name}
         </TableCell>
         <TableCell align="left">{row.country}</TableCell>
         <TableCell align='left' size="small">{row.state_province}</TableCell>
         <TableCell className={styles.span} align="left"><span>{row.web_pages.length}</span> {row.web_pages[0]}</TableCell>
         <TableCell className={styles.span} align="left"><span>{row.domains.length}</span> {row.domains[0]}</TableCell>
       </TableRow>
       <TableRow>
         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
           <Collapse in={open} timeout="auto" unmountOnExit>
             <Box sx={{ margin: 1 }}>
               <Typography variant="h6" gutterBottom component="div">
                  Web pages & Domains
               </Typography>
               <Table size="small" aria-label="web pages">
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
               <Table style={{ paddingBottom: 0, marginTop: "20px" }} size="small" aria-label="domain">
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
             </Box>
           </Collapse>
         </TableCell>
       </TableRow>
     </Fragment>
   );
 }