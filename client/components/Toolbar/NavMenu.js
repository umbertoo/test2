import React from 'react';
import {Link} from 'react-router'
import forEach from 'lodash/collection/forEach'

class NavMenu extends React.Component{
    onMenuItemClick(name, e){
        this.props.onMenuItemClick(name);
    }
    render() {
        var list =[];
        try {
            forEach(this.props.labels,e=>list.push(
                <div key={e.id} onClick={this.onMenuItemClick.bind(this,e.name)}>
                    <Link                        to={`/label/${e.name}`}
                        className="menu_item"
                        activeClassName="active_item">
                        <span className=""> {e.name}</span>
                    </Link>
                </div>
            ));
        } catch (e){console.log(e)}
        return (
            <div className="nav_menu">
                <Link to={`/`}
                      className="menu_item keep_icon"
                      activeClassName="active_item">
                    <span> Заметки</span>
                </Link>
                <div className="labels_nav_menu">
                    <div className="labels_nav_menu_header">
                        <span>Ярлыки</span>
                        <div onClick={this.props.onClickOpenLabelsModal} className="open_labels_modal">
                            Изменить
                        </div>
                    </div>
                    {list}
                </div>
            </div>
        );
    }
}
NavMenu.contextTypes={
    router: React.PropTypes.object
};
export default NavMenu;
