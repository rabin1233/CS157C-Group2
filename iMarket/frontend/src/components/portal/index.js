import React, {useState} from 'react';

import { AiOutlineClose } from 'react-icons/ai';
const Portal = ({children, openBtn, full}) => {
    const [open, setOpen] = useState(false);

    const closeHandle = () => {
        setOpen(false);
    }
    const openHandle = () => {
        setOpen(true);
    }

    return (
        <React.Fragment>
            <div onClick={openHandle}>
                {openBtn}
            </div>
            <div style={{display: `${open ? 'block' : 'none'}`}} className="custom_modal" onClick={closeHandle}>
                <div>
                <div className="modal_box" style={{ height: `${full ? '100%' : 'max-content'}`}} onClick={(e) => e.stopPropagation()}>
                    <button onClick={closeHandle} className="btn btn-secondary"><AiOutlineClose /> Close</button>
                        <div>{children}</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Portal

