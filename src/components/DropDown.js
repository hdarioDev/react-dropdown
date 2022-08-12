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
  const { newDocument, error, setError } = useContext(SearchContext);
  const isInViewport1 = useIsInViewport(ref1);
  const [searched, setSearched] = useState('');
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
    if (isInViewport1 && searched.trim() === '' && data.length > 0) {
      fetchData();
    }
  }, [isInViewport1]);

  const fetchData = async () => {
    console.log("fetchData");
    console.log("endFetch", endFetch);
    let dataDocuments = [];
    if (!endFetch) {
      setLoading(true);
      dataDocuments = await getDocumentsPaginate(query.start, query.limit);
      console.log(dataDocuments);
      setLoading(false);
      if (dataDocuments.length > 0) {
        setData([...data, ...dataDocuments]);
        setDataComplete([...dataComplete, ...dataDocuments]);
        if (dataDocuments.length == query.limit) {
          let start = query.limit + 1;
          let limit = query.limit + LIMIT_DEFAULT;
          setQuery({ start: start, limit: limit });
        } else {
          setEndFetch(true);
        }
      }
      if (dataDocuments.length == 0) {
        setEndFetch(true);
      }
    }
  }

  const onHandleChange = (e) => {
    const text = e.target.value;
    setSearched(e.target.value);
    if (text.trim() != '') {
      //data = dataComplete.filter();
      const filtered = dataComplete.filter((value) => {

        //nombre | nit | codigo | razon_social | telefono

        switch (CAMPO_FILTER) {
          case 'nombre':
            return value.nombre.toLowerCase().includes(searched.toLowerCase());
            break;
          case 'nit':
            return value.nit.toLowerCase().includes(searched.toLowerCase());
          case 'codigo':
            return value.codigo.toLowerCase().includes(searched.toLowerCase());
            break;
          case 'razon_social':
            return value.razon_social.toLowerCase().includes(searched.toLowerCase());
            break;
          case 'telefono':
            return value.telefono.toLowerCase().includes(searched.toLowerCase());
            break;
          default:
            return value.nombre.toLowerCase().includes(searched.toLowerCase());

        }
      })
      setData(filtered);
      if (filtered.length == 0) {
        setNotFound(true);
      }
    } else {
      setData(dataComplete);
    }
  }

  useEffect(() => {
    if (newDocument != null) {
      if (!error) {
        setData([newDocument]);
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
              <input onChange={onHandleChange} className={styles.container__input__search} type="text" placeholder="Search..." />
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
                  notFound ? <div onClick={onHandleOpenModal} className={styles.container__list__notfound}><ModalMaterial campo={CAMPO_FILTER} value={searched} /></div> : null
                }
              </div>
            </div>
            : null
        }
      </div>
      {
        focus ?
          null : <div ref={ref1}></div>
      }
    </div>


  );
}
