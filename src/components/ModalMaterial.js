import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Form from './Form';
import { migrateData } from '../firebase/data';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalMaterial({ campo, value }) {
    const dataDefault = {
        campo,
        value
    }
    console.log("props ", dataDefault);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const onHandleMigrate = () => migrateData();
    return (
        <div>
            <Button onClick={handleOpen}>CREAR NUEVO REGISTRO</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    {/* <button onClick={onHandleMigrate}>migrar</button> */}
                    <Form dataDefault={dataDefault} onClose={handleClose} />
                </Box>
            </Modal>
        </div>
    );
}