import 'components/home/home.css';
import {useState, useEffect, useContext} from 'react';
import MainLayout from 'layout/MainLayout';
import ItemCard from 'layout/ItemCard'
import ItemDetail from 'layout/ItemDetail'
import Portal from 'components/portal';
import Button from "components/button";
import axios from 'axios';
import {useHistory} from "react-router-dom";
import authcontext from 'context/user/authcontext';

const API = 'http://localhost:3001/products';

const User = () => {
    const [items, setItems] = useState([]);
    const {userData} = useContext(authcontext);
    useEffect(() => {
        axios.get(`${API}/${userData.id}`, {
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
    console.log(items);
    return (
        <MainLayout>
            <h3 style={{margin: '20px 0'}}>Basic Information</h3>
            <table className="table table-striped">
                <tbody>
                    <tr>
                    <td>Name</td>
                    <td>{userData.name}</td>
                    </tr>
                    <tr>
                    <td>Email</td>
                    <td>{userData.email}</td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <h3>
                Your Items Lists
            </h3>
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

export default User;