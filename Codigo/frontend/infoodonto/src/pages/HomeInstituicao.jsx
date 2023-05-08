import * as React from 'react';

import { deleteDentista } from '../services/api';

import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {LoginContext} from '../context/LoginContext'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import { Button } from '@mui/material';

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

import styles from '../css/HomeInstituicao.module.css'
import Logo from '../img/logo.png'



export default function HomeInstituicao() {
    const [dentistas, setDentistas] = useState([])
    const [open, setOpen] = useState(false);
    const {user} = useContext(LoginContext)

    useEffect(() => {
          setDentistas(user.dentistas)
    }, [dentistas])

    const messageRemove = () => {
        setOpen(true);
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const rows = [];

    dentistas.forEach(dentista => {
        rows.push(createData(dentista.name, dentista.matricula, dentista._id ))
    });
    
    function createData(name, matricula, id) {
        return { name, matricula, id };
    }  

    function handleDelete(id){
        deleteDentista(id).then(() => {
            setDentistas(dentistas.filter(dentista => dentista._id !== id));
        }).catch(error => {
            console.log(error);
        });
    }

    return (
    <div className={styles.body}>
        <div className={styles.logo}>
            <img src={Logo} alt="Logo" />
        </div>
        <div className={styles.divButtonCreate}>
            <Button variant="contained" href='/formDentista'>Adicionar dentista</Button>
        </div>
        <div className={styles.tableContainer}>
            <TableContainer component={Paper} className={styles.table}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align="right">Matrícula</TableCell>
                    <TableCell align="right" className={styles.tableCell}></TableCell>
                    <TableCell align="right" className={styles.tableCell}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                    <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        {row.name}
                        </TableCell>
                        <TableCell align="right">{row.matricula}</TableCell>
                        <TableCell align="right" className={styles.tableCell}>
                            <Link to={`/editDentista/${row.id}`} className={styles.buttonCrud}>
                                <EditIcon className={styles.icon} />
                            </Link>
                        </TableCell>
                        <TableCell align="right" className={styles.tableCell}><button className={styles.buttonCrud} onClick={() => {
                            handleDelete(row.id)
                            messageRemove()
                        }}><DeleteIcon className={styles.icon}/></button></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Dentista removido com sucesso!
            </Alert>
        </Snackbar>
    </div>

    );
}