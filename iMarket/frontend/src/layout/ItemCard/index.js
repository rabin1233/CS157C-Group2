import {useContext} from 'react';
import './itemCard.css';
import { AiFillDollarCircle, AiFillDelete } from 'react-icons/ai';
import {Link} from 'react-router-dom';
import Portal from 'components/portal';

import authcontext from 'context/user/authcontext'
import DeleteAlert from './DeleteAlert';

const ItemCard = ({
    id,
    title,
    description,
    src,
    price,
    city,
    state,
    zip,
    phoneNumber,
    children,
    uid,
}) => {
    const {userData, isLoggedIn} = useContext(authcontext);
    return (
        <div className="card rental-card" style={{width: '18rem'}}>
            {src && <img src={src} className="card-img-top" alt="..." style={{width: '18rem', height: '13rem', objectFit: 'cover'}}/>}
            <div className="card-body">
                <h5 className="card-title card-title-custom">
                    <span>{title}</span>
                    <span className="price"><AiFillDollarCircle />{price}</span>
                </h5>
                <p className="card-text rental-desc">{description}</p>
                <div className="rental-footer">
                    <div>
                    {children}
                    </div>
                    {isLoggedIn && uid === userData.id && (
                        <Portal openBtn= {
                            <div className="deleteIcon">
                                <AiFillDelete />
                            </div>
                        }
                        >
                            <DeleteAlert id={id} />
                        </Portal>
                    )}

                </div>

            </div>
        </div>
    )
}

export default ItemCard