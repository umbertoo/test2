import checkStatus from "./common/check_status_response";
import { type } from "./common/types";
import { normalize, arrayOf } from "normalizr";
import { schemas } from "./common/schemas";
import API from "./common/API";
import difference from 'lodash/array/difference';

const fetchNotesRequest = (labelname) =>({
    type: type.FETCH_NOTES_REQUEST,
    isFetching: true,
    labelname
});

const fetchNotesSuccess = (res,labelname) =>({
    type: type.FETCH_NOTES_SUCCESS,
    payload: normalize(res, arrayOf(schemas.note)),
    isFetching: false,
    labelname
});

const fetchNotesFailure = (res, labelname) =>({
    type: type.FETCH_NOTES_FAILURE,
    isFetching: false,
    labelname
});

export const fetchNotes = (labelname, nextPage) => (dispatch, getState) => {
    let limit  =4;

    let {
        pageCount=0
    } = getState().pagination.idsByLabel[labelname||'all']||{};

    // if (!labelname) {
    //     pageCount= getState().notes.pageCount||0;
    // }

    if(nextPage || pageCount==0){

        let offset = limit * pageCount;
        let url;
        if (labelname === undefined) {
            url = `/api/notes?limit=${limit}&offset=${offset}`;
        } else {
            url = `/api/labels/${labelname}/notes?limit=${limit}&offset=${offset}`;

        }
        dispatch(fetchNotesRequest(labelname));

        fetch(url).then(checkStatus).then(res => res.json())
        .then(res => {
            dispatch(fetchNotesSuccess(res,labelname||'all'));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchNotesFailure(labelname));
        });
    }
};


export const fetchNote = id => dispatch => {
    dispatch({
        type: type.FETCH_NOTE_REQUEST,
        isFetching: true
    });

    fetch('/api/notes/' + id).then(checkStatus).then(res => res.json())
    .then(res=> {
        dispatch({
            type: type.FETCH_NOTE_SUCCESS,
            payload: normalize(res, schemas.note),
            isFetching: false
        });
    })
    .catch(error=> {
        dispatch({
            type: type.FETCH_NOTE_FAILURE,
            isFetching: false
        });
    });
};


export const addNote = ( note, labelname ) => (dispatch, getState) => {
    const allLabels = getState().labels.items;
    const labelsNames = note.labels.map(id => allLabels[id].name);
    labelsNames.push('all');
    console.warn('addNote labelname:', labelname, note, labelsNames);

    dispatch({
        type: type.CREATE_NOTES_REQUEST,
        isFetching: true
    });
    const body = {
        text: note.text,
        title: note.title,
        colorId: note.colorId,
        labels: note.labels
    };

    API.Note.create(body)
    .then(res => {
        dispatch({
            type: type.CREATE_NOTES_SUCCESS,
            isFetching: false
        });
        dispatch({
            type: type.ADD_NOTE,
            note: {id: res.id, ...body},
            labelsNames
        });

    })
    .catch(error=> {
        console.log(error);
        dispatch({
            type: type.CREATE_NOTES_FAILURE,
            error_msg: "Ошибка " + error,
            isFetching: false
        });
    });
};



export const deleteNote = note => {
    return (dispatch, getState) => {
        let labels = getState().labels.items;
        let labelsNames = note.labels.map(id=>labels[id]);
labelsNames.push('all');
        dispatch({
            type: type.DELETE_NOTES_REQUEST,
            isFetching: true
        });
        API.Note.delete(note.id)
        .then(res=> {
            dispatch({
                type: type.DELETE_NOTES_SUCCESS,
                isFetching: false

            });
            dispatch({type: type.DELETE_NOTE,
                     labelsNames,
                note});

        })
        .catch(error=> {
            console.error(error);
            dispatch({
                type: type.DELETE_NOTES_FAILURE,
                error_msg: "Ошибка " + error,
                isFetching: false
            });
        });
    };
};
const updatePagination = (note, state) => {

    let oldLabels = state.notes.items[note.id].labels;
    let newLabels = note.labels;
    let labels = state.labels.items;

    let deleted = difference(oldLabels,newLabels).map(id=>labels[id].name)[0];
    let added = difference(newLabels,oldLabels).map(id=>labels[id].name)[0];

    return({
        type: type.UPDATE_PAGINATION,
        labelname:added||deleted,
        deleted:!!deleted,
        added:!!added,
        noteId: note.id
    });
};

export const updateNote = note => (dispatch,getState) => {
    dispatch({
        type: type.UPDATE_NOTES_REQUEST,
        NoteisFetching: true
    });
    dispatch(updatePagination(note,getState()));
    dispatch({
        type: type.UPDATE_NOTE,
        note
    });
    API.Note.update(note.id, {
        title: note.title,
        text: note.text,
        colorId: note.colorId,
        labels: note.labels
    }).then(res=> {
        dispatch({
            type: type.UPDATE_NOTES_SUCCESS,
            NoteisFetching: false
        });


    }).catch(error=> {
        console.log(error);
        dispatch({
            type: type.UPDATE_NOTES_FAILURE,
            error_msg: "Ошибка " + error,
            NoteisFetching: false
        });
    });

};



export const openNote = id =>({
    type: type.OPEN_NOTE,
    openedNote: id
});

export const changeNoteColor = (colorId, ids)=>dispatch=> {

    dispatch({
        type: type.CHANGE_NOTE_COLOR,
        ids: ids,
        colorId
    });
    dispatch({
        type: type.UPDATE_NOTES_REQUEST,
        isFetching: true
    });
    ids.forEach(id=> {
        API.Note.update(id, {colorId}).then(res=> {
            dispatch({
                type: type.UPDATE_NOTES_SUCCESS,
                isFetching: false
            });
        }).catch(error=> {
            console.log(error);
            dispatch({
                type: type.UPDATE_NOTES_FAILURE,
                error_msg: "Ошибка " + error,
                isFetching: false
            });
        });
    });
};
export const copyNotes = ids =>(dispatch, getState) => {
    let notes = {};
    let notesIds = [];
    let errors=[];
    dispatch({
        type: type.CREATE_NOTES_REQUEST,
        isFetching: true
    });
    Promise.all(
        ids.map((id, i)=> {
            let body = {...getState().notes.items[id]};
            delete body['id'];

            return API.Note.create(body)
            .then(res=> {
                console.info('удачно');
                notes[res.id] = {...body, ...res};
                notesIds.push(res.id);
            })
            .catch(error=> {
                errors.push((i+1));
                console.warn('Ошибка при копировании елемента № '+(i+1),error, body);
                // throw error
            });
        })
    )
    .then(()=>{
        if(errors.length) console.warn('Ошибка при копировании елемента  № '+errors.join(','));
        console.log('Нормас',notes,notesIds);
        dispatch({
            type: type.ADD_NOTES,
            notes,
            notesIds
        });
        dispatch({
            type: type.CREATE_NOTES_SUCCESS,
            isFetching: false
        });
    });
};


// Promise.resolve().then(()=> {
//     //Put API.Note.create in sequence
//     return ids.reduce((sequence, id, i)=> {
//         let body = {...getState().notes.items[id]};
//         delete body['id'];
//         return sequence.then(()=>API.Note.create(body))
//             .then(res=> {
//                 notes[res.id] = {...body, ...res};
//                 console.log('notes', notes)
//             })
//             .catch(error=> {
//                 console.log(error, body);
//                 // throw error
//             })
//
//     }, Promise.resolve());
//
// }).catch(error=> {
//     console.log(error);
// }).then(()=> {
//         dispatch({
//             type: type.ADD_NOTE,
//             notes: notes
//         });
//         dispatch({
//             type: type.CREATE_NOTES_SUCCESS,
//             isFetching: false
//         });
//         console.log('Нормас', notes)
//     }
// );


// dispatch({
//     type: type.CREATE_NOTES_FAILURE,
//     error_msg: "Ошибка " + error,
//     isFetching: false
// });
// if (notes.length) {
//     dispatch({
//         type: type.ADD_NOTE,
//         notes: notes
//     });
// }
// return true

// if (count == ids.length) {

//                  }
