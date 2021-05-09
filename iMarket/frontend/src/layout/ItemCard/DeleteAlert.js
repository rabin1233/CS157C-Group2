import {useState, useContext, useEffect} from 'react';
import axios from 'axios';

import datacontext from 'context/data/datacontext';

const API = 'http://localhost:3001/products'

const DeleteAlert = ({id}) => {
    const [message, setMessage] = useState('');
    const {deleteFromList} = useContext(datacontext);
    const handleDelete = () => {
        axios.delete(`${API}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }).then(({data}) => {
            deleteFromList(data.id)
            setMessage(data.message);
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        let mounted = true;

        return () => {
            mounted= false;
            setMessage('')
        }
    }, [])
    return (
        <>
          <div className="modal-header">
            <h5 className="modal-title">Delete Item</h5>
          </div>
          <div className="modal-body">
              {message ? (
                <div className="alert alert-success" role="alert">
                  {message}
                </div>
              ): (
                <p>Are you sure you want to delete the item?</p>
              )
            }
            
          </div>
        {!message && <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </div>}
        </>
    )
}

export default DeleteAlert;