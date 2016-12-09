import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleLeftBar} from './appBarDucks';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';

class AppBarComp extends Component {
    constructor(props) {
        super(props);
        this.onTapLeft = this.onTapLeft.bind(this);
    }

    onTapLeft() {
        this.props.toggleLeftBar();
    }

    render() {
        return (
            <AppBar
                title="Tax Aburra App"
                iconElementLeft={<IconButton onClick={this.onTapLeft}><NavigationMenu /></IconButton>}
            />
        );
    }
}

const mapActionsToProps = dispatch => {
    return bindActionCreators({
        toggleLeftBar
    }, dispatch);
};

export default connect(null, mapActionsToProps)(AppBarComp);