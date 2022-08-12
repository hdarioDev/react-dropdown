import React, { useState, useContext } from 'react';
import { insertNewDocument } from '../firebase/data';
import { SearchContext } from '../context/SearchContext'
import styles from '../styles/Form.module.scss';


const Form = ({ onClose, dataDefault }) => {

    const { setNewDocument, setError, error } = useContext(SearchContext)
    const [datos, setDatos] = useState({
        nombre: dataDefault.campo == 'nombre' ? dataDefault.value : '',
        razon_social: dataDefault.campo == 'razon_social' ? dataDefault.value : '',
        nit: dataDefault.campo === 'nit' ? dataDefault.value : '',
        telefono: dataDefault.campo == 'telefono' ? dataDefault.value : '',
        codigo: dataDefault.campo == 'codigo' ? dataDefault.value : '',
    })

    const handleInputChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
        addNewDocument();
    }

    const addNewDocument = async () => {
        if (
            datos.nombre !== ''
            && datos.codigo !== ''
            && datos.nit != ''
            && datos.razon_social !== ''
            && datos.telefono !== ''
        ) {
            const newDocument = {
                codigo: datos.codigo, //uuid(),
                nombre: datos.nombre,
                razon_social: datos.razon_social,
                nit: datos.nit,
                telefono: datos.telefono,
            }
            const res = await insertNewDocument(newDocument);
            setNewDocument(newDocument);
            setError(false);
            onClose();
        } else {
            setError(true);
        }

    }
    return (

        <form action="" onSubmit={onHandleSubmit} className={styles.form__container}>
            {
                error ? <div className={styles.form__error}>Llene todos los campos.</div> : null
            }

            <input className={styles.form__input} type="text" onChange={handleInputChange} name="nombre" placeholder="Nombre" value={datos.nombre} />
            <input className={styles.form__input} type="text" onChange={handleInputChange} name="razon_social" placeholder="Razón social" value={datos.razon_social} />
            <input className={styles.form__input} type="text" onChange={handleInputChange} name="nit" placeholder="Nit" value={datos.nit} />
            <input className={styles.form__input} type="text" onChange={handleInputChange} name="telefono" placeholder="Teléfono" value={datos.telefono} />
            <input className={styles.form__input} type="text" onChange={handleInputChange} name="codigo" placeholder="Código" value={datos.codigo} />

            <button className={styles.form__button} type="submit">Guardar</button>
        </form>

    )
}

export default Form