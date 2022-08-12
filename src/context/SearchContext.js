import React, { createContext, useState, useEffect } from 'react'

export const SearchContext = createContext()

const SearchProvider = (props) => {
    // const [dataSearched, setDataSearched] = useState("")
    // const [eventSearch, setEventSearch] = useState(false)
    const [newDocument, setNewDocument] = useState(null);
    const [error, setError] = useState(false);

    return (
        <SearchContext.Provider
            value={
                {
                    newDocument,
                    setNewDocument,
                    error,
                    setError
                }
            }
        >
            {props.children}
        </SearchContext.Provider>
    )
}

export default SearchProvider