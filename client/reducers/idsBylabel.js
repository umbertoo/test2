// import union from 'lodash/array/union';
// import {type} from '../actions/common/types';
//
// import assign from 'lodash/object/assign';
// import omit from 'lodash/object/omit';
//
// import set from 'lodash/object/set';
// import merge from 'lodash/object/merge';
//
// const initState = {
//     ids:[],
//     pageCount:0,
//     nextPageUrl:"",
//     isFetching:false
// };
//
//
// export const idsByLabel = (state = initState, action) => {
//     switch (action.type) {
//         case type.FETCH_NOTES_REQUEST:
//         case type.FETCH_NOTES_FAILURE:
//             return {
//                 ...state,
//                 isFetching:action.isFetching
//             };
//
//         case type.FETCH_NOTES_SUCCESS:
//             return {...state,
//                 ids: union(state.ids, action.payload.result),
//                 // ids: state.ids.concat(action.payload.result),
//                 pageCount:state.pageCount+1,
//                 nextPageUrl:action.nextPageUrl,
//                 isFetching:action.isFetching
//             };
//
//         default:
//           return state;
//     }
// };
