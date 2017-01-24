import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Masonry from "react-masonry-component";

import NoteContainer from "../containers/NoteContainer";
import SelectableItem from './SelectableList/SelectableItem';


class NotesList extends Component {
    constructor(props){
        super(props);
        this.reloadLayout=this.reloadLayout.bind(this);
        this.onLoadMore=this.onLoadMore.bind(this);
        // this.props.route.onEnter=this.method

    }
    componentWillMount(){
        this.props.fetchNotes(this.props.params.label_name);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.params.label_name !== nextProps.params.label_name) {
            this.props.fetchNotes(nextProps.params.label_name);
        }
    }
    componentDidUpdate(){
        this.reloadLayout();
        setTimeout(this.reloadLayout,500);
    }
    reloadLayout(){
        const { ids } = this.props;
        if (ids.length) {
            this.msnr.masonry.layout();
            this.msnr.masonry.reloadItems();
        }
    }
    onLoadMore(e){
        console.log("onLoadMore");

        this.props.fetchNotes(this.props.params.label_name, true);
    }
    render(){
        console.log('list-render');
        const { ids } = this.props;

        if (ids.length) {
            const list = ids.map(id =>
                <SelectableItem key={id} selectableKey={id}>
                    <NoteContainer key={id}
                        onUpdate={this.reloadLayout}
                        id={id}/>
                </SelectableItem>
            );
            return (
                <div className="wrap_notes">
                    <h1>{this.props.pageCount}</h1><div className="btn btn-default" onClick={this.onLoadMore} >Load more</div>
                    <Masonry
                        ref={c=>this.msnr=c}
                        className={'notes_list'}
                        options={{columnWidth: 240, gutter: 16,isFitWidth: true}} >

                        {list}
                    </Masonry>
                    <h1>{this.props.pageCount}</h1><div className="btn btn-default" onClick={this.onLoadMore} >Load more</div>
                </div>
            );
        }

        return (
            <div className="nothing">Нет заметок</div>
        );

    }
}

const mapStateToProps = (state,props) => {
    const labelname = props.params.label_name;

    let ids = [];
    let pageCount = 0;
    if(state.pagination.idsByLabel[labelname || 'all']) {
        ids = state.pagination.idsByLabel[labelname || 'all'].ids || [];
        pageCount = state.pagination.idsByLabel[labelname || 'all'].pageCount;
}

    return {
        ids,
        labels: state.labels.items,
        pageCount
    };
};
export default connect(mapStateToProps, actions)(NotesList);
