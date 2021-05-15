import React,{useState, useContext} from 'react';
import '../../assets/home.css';
import MainLayout from '../../layout/MainLayout';
import datacontext from '../../context/data/datacontext';
import ItemCard from '../../layout/ItemCard/index'
import ItemDetail from '../../layout/ItemDetail/index'
import Portal from '../portal/index';
import Button from "../button/index";

function Home(){
    const {items} = useContext(datacontext);
    console.log(items)
    return(
        <MainLayout>
        <p> 
            Welcome to iMarket. Here, we offer customers opportunity to keep track of all the items they have bought 
            in their own inventory for FREE of charge. We also offer customer a way to post and sell the items that they don't need anymore.
        </p>

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
                   uid={item.uid}
                   >
                    <Portal openBtn={<Button color="primary">View Detail</Button>} full>
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

export default Home