import {useHistory} from 'react-router-dom';
import React from 'react';

const ItemDetail = (props) => {
    const history = useHistory();
    return (
        <div>
            <h2 style={{textAlign: 'center'}}>{props.title}</h2>
            <hr />
            <div style = {{textAlign: 'left'}}> {
                <>
                    <ListItem heading="Description" item={props.description} linebreak/>
                    <ListItem heading="Price" item={` $${props.price}`}/>
                    <ListItem heading= "Contact" item = {props.phoneNumber}/>
                    <ListItem heading= "Location" item = {props.address}/>
                    {props.name && <ListItem heading= "Posted By" item = {props.name} onClick={() => history.push(`items/${props.uid}?name=${props.name}`)} hover/>}
                    {props.email && <ListItem heading= "Email" item = {props.email}/>}
                    <>
                    {props.images && (
                        <div className="detail_image_container">
                            {props.images.map(({url, id}) => (
                                <img src={url} key={id} className="card-img-top" alt="..." style={{width: '15rem', height: '12rem', objectFit: 'cover', margin: '10px 0'}}/>
                            ))}
                        </div>
                    )}
                    </>

                </>
            }
            </div>
        </div>
    )
}

export default ItemDetail;

const ListItem = ({heading, item, linebreak, onClick, hover}) => {
    return (
        <div className={`detail_listitem ${hover && 'name_hover'}`} onClick={onClick && onClick}>
            <p>
                <strong>{heading}: {' '}</strong>
                {linebreak && <br />}
                <span>{item}</span>
            </p>
        </div>
    )
}