import React, {useState, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { SERVICE_ERROR } from '../../actions/actionTypes'
import './serviceError.scss'

const ServiceError = () => {
    const error = useSelector(state => state.events.serviceError);
    const dispatch = useDispatch();
    // const [error, SetError] = useState(false);
    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     }
    // }, [input])
    
    const handleClose = (e) => {
        // e.preventDefault();
        dispatch({type:SERVICE_ERROR, payload: null })
    }
    console.log('service js is rendered 1');
    return(
            <Fragment>
                {
                    !!error ?
                    <div className="serviceError">
                        <div>{`${error}`}</div>
                        <button onClick={handleClose}>close</button>
                    </div>
                    :
                    ""
                }
            </Fragment>
    )
}

export default ServiceError;