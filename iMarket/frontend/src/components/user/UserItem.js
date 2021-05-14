import '../../assets/home.css';
import React,{useState, useEffect} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import MainLayout from "../../layout/MainLayout";
import ItemCard from '../../layout/ItemCard/index'
import ItemDetail from '../../layout/ItemDetail/index'
import Portal from '../portal/index';
import Button from "../button/index";

import axios from 'axios';

const API = 'http://localhost:3001/products'

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const UserItem = () => {
    const [items, setItems] = useState([]);
    const {userId} = useParams();
    let query = useQuery();
    useEffect(() => {
        axios.get(`${API}/${userId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }).then(({data}) => {
            setItems(data.data); 
        }).catch(err => {
            console.log(err)
        })
    }, [ ])
    return (
        <MainLayout>
            <h3>Item Posted by {query.get("name")}</h3>
            <div className = "row">
            <div className="flex-container">
                {items.map((item) => (
                 <ItemCard
                   key={item._id}
                   id={item._id}
                   title={item.title}
                   description={item.description}
                   src={item.images && item.images[0].url}
                   price={item.price}
                   user={item.user}
                   phoneNumber = {item.phoneNumber}
                   >
                    <Portal openBtn={<Button color="primary">View Detail</Button>}>
                        <ItemDetail
                            title={item.title}
                            description = {item.description}
                            images={item.images}
                            price={item.price}
                            user={item.user}
                            phoneNumber = {item.phoneNumber}
                            address={`${item.city}, ${item.state} ${item.zip}`}
                            images={item.images}
                            name={item.name}
                            email={item.email}
                            uid={item.uid}
                        />
                    </Portal> 
                   </ItemCard>
             
                ))
                }
            </div>
        </div>
        </MainLayout>
    )
}

export default UserItem;