import React,{useState, useEffect, useCallback} from 'react';
import datacontext from './datacontext';
import axios from 'axios';
const API = 'http://localhost:3001/products'

const ItemProvider = ({children}) => {
    const[items, setItems] = useState([]);

    useEffect(() => {
        axios.get(`${API}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }).then(({data}) => {
            setItems(data); 

        }).catch(err => {
            console.log(err)
        })
    }, []);

    const addToList = (data) => {
        setItems(prevState => [...prevState, data]);
    }
    const deleteFromList = (id) => {
        setItems(items.filter(item => item._id !== id));
    }

    return (
        <datacontext.Provider
            value={{
                items,
                addToList,
                deleteFromList,
            }}
        >
            {children}
        </datacontext.Provider>
    )
}
export default ItemProvider;