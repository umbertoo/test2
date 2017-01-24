import checkStatus from  './common/check_status_response'
import {type} from './common/types'
import {normalize, arrayOf} from 'normalizr'
import {schemas} from './common/schemas'

export function fetchColors() {
    console.log('fetchColors')
    return (dispatch, getState) => {
        dispatch({
            type: type.FETCH_COLORS_REQUEST,
            isFetching: true
        });
        fetch('http://localhost:8080/api/colors').then(checkStatus).then(res=> res.json()).then(res=> {
            dispatch({
                type: type.FETCH_COLORS_SUCCESS,
                colors: normalize(res, arrayOf(schemas.color)),
                isFetching: false
            });
            console.log(normalize(res, arrayOf(schemas.color)));

        }).catch(error=> {
            console.log('error fetchColors - ', error);
            dispatch({
                type: type.FETCH_COLORS_FAILURE,
                isFetching: false
            });
        });
    }

}
