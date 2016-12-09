import React, {Component} from 'react';
import {mainTheme} from '../../utils/constants';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppMenu from './appBarComponent';
import LeftMenu from './leftBar';
import {Grid} from 'react-flexbox-grid';

const muiTheme = getMuiTheme(mainTheme);
const gridStyle = {
    marginTop: 60
};

class App extends Component {
    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AppMenu />
                    <LeftMenu/>
                    <Grid fluid style={gridStyle}>
                        {this.props.children}
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}


export default App;