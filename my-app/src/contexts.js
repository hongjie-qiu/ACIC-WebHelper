import React, {useState, useContext, useEffect} from 'react';
import { useCallback } from 'react';
import fetchData from "./ProcessData.js";

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState("Please enter the keyword ...");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState("");

    useEffect(() => {
        const data = fetchData(searchTerm);
        setBooks(data);
    }, [searchTerm]);

    return (
        <AppContext.Provider value = {{
            loading, books, setSearchTerm, resultTitle, setResultTitle,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};