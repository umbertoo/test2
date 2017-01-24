import { createSelector } from 'reselect';
import forEach from 'lodash/collection/forEach';
import map from 'lodash/collection/map';
import find from 'lodash/collection/find';
import some from 'lodash/collection/some';
import filter from 'lodash/collection/filter';



const labels = state => state.labels.items;
const noteLabels = (state,props) => state.notes.items[props.id].labels;

const getLabels = (labels, noteLabels) => noteLabels.map(id => labels[id]);

console.log("getLabels" );

    // return filter(labels, label => noteLabels.some(id => id == label.id));


export const makeGetVisibleTodos = () => {
    // console.log("makeGetVisibleTodos");
    return createSelector(
        labels,
        noteLabels,
        getLabels
    );
};


export default makeGetVisibleTodos;

 // return Promise.all(
 //    components.reduce((previous, current) => {
 //        return (current && current.fetchData || [])
 //          .concat((current && current.WrappedComponent ? current.WrappedComponent.fetchData : []) || [])
 //          .concat(previous);
 //      }, [])
 //      .map(fetchData => dispatch(fetchData(params)))
 //  );
