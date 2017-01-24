import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class SelectableArea extends Component {
    constructor(props){
        super(props);
        this.registry=[];
        this.openSelector = this.openSelector.bind(this);
        this.finishSelection = this.finishSelection.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.state={
            keys: [],
            selected_count: 0
        };
    }
    getChildContext() {
        return {
            selectable: {
                register: this._registerSelectable.bind(this),
                unregister: this._unregisterSelectable.bind(this),
                toggleSelect: this._toggleSelect.bind(this)
            }
        };
    }
    componentDidMount() {
        // document.addEventListener('mousedown',this.onMouseDown);
        this._frame = this.refs.select_frame;
        this._area = this.refs.select_area;

    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {

        return (this.state.selected_count !== nextState.selected_count
        || nextProps !== this.props || nextContext !== this.context);
    }

    componentDidUpdate(prevProps, prevState) {
        /*Если меняется число выделенных элементов, то синхронизируем стейт SelectableArea с
         со стейтами SelectableItem */
        if (this.state.selected_count !== prevState.selected_count) {
            // let ids = [];
            // this.state.keys.forEach(e=>ids.push({id: e}));
            this.props.onChangeCountSelection(this.state.keys);

            this.registry.forEach(elem=> {
                    let isSelected = elem.domNode.state.selected;
                    /* Меняем стейт только там где это необходимо*/
                    if (this.state.keys.indexOf(elem.key) > -1) {
                        if (!isSelected) {
                            // console.warn('setState');
                            elem.domNode.setState({selected: true});
                        }
                    } else {

                        if (isSelected) {
                            elem.domNode.setState({selected: false});
                            // console.warn('setState');

                        }
                    }
                }
            );
        }
    }
    _toggleSelect(key){

        let {keys, selected_count}= this.state;
        if (this.state.keys.indexOf(key) <= -1) {
            this.setState({
                keys: [...keys, key],
                selected_count: selected_count + 1
            });

        } else {
            this.setState({
                keys: [...keys].filter(e=>e !== key),
                selected_count: selected_count - 1
            });
        }

    }
    _registerSelectable(key, domNode) {
        this.registry.push({key, domNode});

    }
    _unregisterSelectable(key) {
        this.registry = this.registry.filter(data =>data.key !== key);
    }

    deSelectAll(){
        if (this.state.selected_count > 0) {
            this.setState({
                keys: [],
                selected_count: 0
            });
        }
    }

    onMouseDown(e){
        // console.log('onmousedown', e.target.parentNode, ReactDOM.findDOMNode(this));
        if (e.target.parentNode == ReactDOM.findDOMNode(this)) {

            this.deSelectAll();
            let frame = this._frame.style;

            this._areabox = this._area.getBoundingClientRect();

            this._initLeft = Math.abs(e.pageX - this._areabox.left - (window.pageXOffset || document.documentElement.scrollLeft));
            this._initTop = Math.abs(e.pageY - this._areabox.top - (window.pageYOffset || document.documentElement.scrollTop));

            frame.display = "block";
            frame.left = this._initLeft + "px";
            frame.top = this._initTop + "px";
            frame.width = 0 + "px";
            frame.height = 0 + "px";
            this._area.addEventListener('mousemove', this.openSelector);
            document.addEventListener('mouseup', this.finishSelection);
        }

    }
    selectElements() {
        let count = 0;
        let keys = [];
        this.registry.forEach(elem=> {
                if (this.isCollide(this._frame, ReactDOM.findDOMNode(elem.domNode))) {
                    count++;
                    keys.push(elem.key);
                }
            }
        );
        this.setState({
            selected_count: count,
            keys
        });
    }

    duringSelection(ids){
        this.props.onDuringSelection(ids);
    }

    finishSelection(){
        this._area.removeEventListener('mousemove', this.openSelector);

        this._frame.style.display = "none";
        // let ids = [];
        // this.state.keys.forEach(e=>ids.push({id: e}));
        this.props.onFinishSelection(this.state.keys);
        document.removeEventListener('mouseup', this.finishSelection);


    }
    openSelector(e) {
        this._areabox = this._area.getBoundingClientRect();
        let f = this._frame.style;
        let initLeft = this._initLeft;
        let initTop = this._initTop;

        let x = e.pageX - this._areabox.left - (window.pageXOffset || document.documentElement.scrollLeft);
        let y = e.pageY - this._areabox.top - (window.pageYOffset || document.documentElement.scrollTop);

        f.width = Math.abs(x - initLeft) + 'px';
        f.height = Math.abs(y - initTop) + 'px';
        f.left = (x - initLeft < 0) ? x + 'px' : initLeft + 'px';
        f.top = (y - initTop < 0) ? y + 'px' : initTop + 'px';

        this.selectElements();
    }
    isCollide(e1, e2) {
        let a = e1.getBoundingClientRect();
        let b = e2.getBoundingClientRect();
        return !(
            ((a.top + a.height) < (b.top)) ||
            (a.top > (b.top + b.height)) ||
            ((a.left + a.width) < b.left) ||
            (a.left > (b.left + b.width))
        );
    }
    render() {
        // console.log('selectableArea-render');
        return (
            <div ref="select_area"  className="select_area" onMouseDown={this.onMouseDown}>
                <div className="select_frame" ref="select_frame"></div>
                {this.props.children}
            </div>

        );
    }
}
SelectableArea.childContextTypes={
    selectable: React.PropTypes.object
};
export default SelectableArea;
