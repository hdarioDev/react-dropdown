import React, { useEffect, useRef, useState, useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import { useIsInViewport } from '../hooks/useIsInViewport';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { getDocumentsPaginate } from '../firebase/data';
import styles from '../styles/Dropdown.module.scss';
import ModalMaterial from './ModalMaterial';
import { LIMIT_DEFAULT } from '../utils/constants';

//nombre | nit | codigo | razon_social | telefono
const CAMPO_FILTER = 'nombre';

export default function DropDown() {
  const ref1 = useRef(null);
  const searched = useRef('');
  const { newDocument, error, setError } = useContext(SearchContext);
  const isInViewport1 = useIsInViewport(ref1);
  const [dataComplete, setDataComplete] = useState([]);
  const [endFetch, setEndFetch] = useState(false)
  const [focus, setFocus] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const onHandleOpen = () => {
    setFocus(value => !value);
    setQuery({ start: 1, limit: LIMIT_DEFAULT });
    setDataComplete([]);
    setData([]);
    setEndFetch(false);
    fetchData();
  }
  const onHandleOpenModal = () => {
    setModal(value => !value);
    setError(false);
  }

  const [data, setData] = useState([]);

  const [query, setQuery] = useState({ start: 1, limit: LIMIT_DEFAULT });

  useEffect(() => {
    if (searched) {
      if (isInViewport1 && searched.current.value === '' && data.length > 0) {
        fetchData();
      }
    }

  }, [isInViewport1]);

  const fetchData = async () => {

    let dataDocuments = [];
    if (!endFetch) {
      setLoading(true);
      dataDocuments = await getDocumentsPaginate(query.start, query.limit);
      setLoading(false);
      if (dataDocuments.length > 0) {
        setData([...data, ...dataDocuments]);
        setDataComplete([...dataComplete, ...dataDocuments]);
        if (dataDocuments.length === query.limit) {
          let start = query.limit + 1;
          let limit = query.limit + LIMIT_DEFAULT;
          setQuery({ start: start, limit: limit });
        } else {
          setEndFetch(true);
        }
      }
      if (dataDocuments.length === 0) {
        setEndFetch(true);
      }
    }
  }

  const onHandleChange = (e) => {
    const text = e.target.value;
    if (text.trim() !== '') {
      //data = dataComplete.filter();
      const filtered = dataComplete.filter((value) => {
        //nombre | nit | codigo | razon_social | telefono

        switch (CAMPO_FILTER) {
          case 'nombre':
            return value.nombre.toLowerCase().includes(searched.current.value.toLowerCase());
            break;
          case 'nit':
            return value.nit.toLowerCase().includes(searched.current.value.toLowerCase());
          case 'codigo':
            return value.codigo.toLowerCase().includes(searched.current.value.toLowerCase());
            break;
          case 'razon_social':
            return value.razon_social.toLowerCase().includes(searched.current.value.toLowerCase());
            break;
          case 'telefono':
            return value.telefono.toLowerCase().includes(searched.current.value.toLowerCase());
            break;
          default:
            return value.nombre.toLowerCase().includes(searched.current.value.toLowerCase());

        }
      })
      setData(filtered);
      if (filtered.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    } else {
      setData(dataComplete);
      setNotFound(false);
    }
  }

  useEffect(() => {
    if (newDocument !== null) {
      if (!error) {
        setData([newDocument]);
        setDataComplete([...dataComplete, newDocument]);
        setNotFound(false);
      }
    }
  }, [newDocument])

  return (
    <div>
      <div className={styles.dropdown__container}>
        <div className={styles.dropdown__container__dropdown} onClick={onHandleOpen}>
          <p>Abrir DropDown TG</p>
          <ArrowDropDownIcon />
        </div>
        {
          focus ?
            <div className={styles.container}>
              <input onChange={onHandleChange} ref={searched} className={styles.container__input__search} type="text" placeholder="Search..." />
              <div className={styles.container__list}>
                {
                  data.map
                    ((row, index) => (
                      <div key={index} className={styles.container__list__item}>
                        <p>{row.codigo}  :</p>  <span> {row.nombre} - {row.nit} </span>
                      </div>
                    ))
                }
                <div className={styles.container__loading} ref={ref1} >
                  {
                    loading ? <p>Loading ... </p> : null
                  }
                </div>
                {
                  notFound ? <div onClick={onHandleOpenModal} className={styles.container__list__notfound}><ModalMaterial campo={CAMPO_FILTER} value={searched.current.value} /></div> : null
                }
              </div>
            </div>
            : null
        }
      </div>
      {
        focus ?
          null : <><div ref={searched}></div><div ref={ref1}></div></>
      }
    </div>


  );
}
