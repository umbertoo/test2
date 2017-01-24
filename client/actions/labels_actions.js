import checkStatus from  './common/check_status_response';
import {type} from './common/types';
import {normalize, arrayOf} from 'normalizr';
import {schemas} from './common/schemas';


export const addLabel = (name) => {

    return (dispatch, getState) => {
        console.log("addLabel");

        dispatch({
            type: type.CREATE_LABELS_REQUEST,
            isFetching: true
        });

        fetch('http://localhost:8080/api/labels', {
            method: 'POST', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                name
            })
        }).then(checkStatus).then(res=> res.json()).then(res=> {
            dispatch({
                type: type.CREATE_LABELS_SUCCESS,
                isFetching: false
            }
        );
        dispatch({
            type: type.ADD_LABEL,
            label:{id: res.id,  name}
        });
    }).catch(error=> {
        console.log(error);
        dispatch({
            type: type.CREATE_LABELS_FAILURE,
            error_msg: "Ошибка " + error,
            isFetching: false
        });
    });
};
};

export const fetchLabels = ()=> dispatch=> {
    dispatch({
        type: type.FETCH_LABELS_REQUEST,
        isFetching: true
    });
    fetch('http://localhost:8080/api/labels').then(checkStatus).then(res=> res.json())
    .then(res=> {
        dispatch({
            type: type.FETCH_LABELS_SUCCESS,
            payload: normalize(res, arrayOf(schemas.label)),
            isFetching: false
        });

        console.log('success fetchLabels - ', res);

    }).catch(error=> {
        console.log('error fetchLabels - ', error);
        dispatch({
            type: type.FETCH_LABELS_FAILURE,
            isFetching: false
        });
    });
};



export const deleteLabel = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: type.DELETE_LABELS_REQUEST,
            isFetching: true
        });

        fetch('/api/labels/' + id, {
            method: 'DELETE'
        }).then(checkStatus).then(res=> {
            console.log('status', res.status);
            return res.json();
        }).then(res=> {
            dispatch({
                type: type.DELETE_LABELS_SUCCESS,
                isFetching: false
            });
            dispatch({type: type.DELETE_LABEL, id});
        }).catch(error=> {
            console.log(error);
            dispatch({
                type: type.DELETE_LABELS_FAILURE,
                error_msg: "Ошибка " + error,
                isFetching: false
            });
        });
    };
};

export function updateLabel(payload) {
    console.log(payload);
    return (dispatch, getState) => {
        dispatch({
            type: type.UPDATE_LABELS_REQUEST,
            LabelisFetching: true
        });
        dispatch({
            type: type.UPDATE_LABEL,
            label:{id: payload.id,
                name: payload.name}
            }
        );
        fetch('/api/labels/' + payload.id, {
            method: 'PUT', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                name: payload.name
            })
        }).then(checkStatus).then(res=> {
            console.log('status', res.status);
            return res.json();
        }).then(res=> {
            dispatch({
                type: type.UPDATE_LABELS_SUCCESS,
                LabelisFetching: false
            });

        }).catch(error=> {
            console.log(error);
            dispatch({
                type: type.UPDATE_LABELS_FAILURE,
                error_msg: "Ошибка " + error,
                LabelisFetching: false
            });
        });

    };
};
