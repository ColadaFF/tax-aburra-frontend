import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loadRides, deleteRide} from './ridesDucks';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Col, Row} from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import AddIcon from 'material-ui/svg-icons/content/add-box';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import _ from 'lodash';

const renderRows = (deleteRideFn, {id, address, responsibleName, initDate, endDate}, key) => {
    return (
        <TableRow key={key} selectable={false}>
            <TableRowColumn>{id}</TableRowColumn>
            <TableRowColumn>{address}</TableRowColumn>
            <TableRowColumn>{responsibleName}</TableRowColumn>
            <TableRowColumn>{initDate}</TableRowColumn>
            <TableRowColumn>{endDate !== null ? endDate : 'No reportada'}</TableRowColumn>
            <TableRowColumn>
                <div>
                    <Link to={`/rides/edit/${id}`}>
                        <IconButton
                            tooltip={"Editar"}
                            style={{margin: "5px auto"}}
                            tooltipPosition="bottom-left"
                            children={<EditIcon />}
                        />
                    </Link>

                    <IconButton
                        tooltip={"Eliminar"}
                        style={{margin: "5px auto"}}
                        tooltipPosition="bottom-left"
                        children={<DeleteIcon />}
                        onTouchTap={(e, i) => {
                            deleteRideFn({id, address, responsibleName, initDate, endDate});
                        }}
                    />
                </div>
            </TableRowColumn>
        </TableRow>
    );
};

const styles = {
    button: {
        margin: 20,
        float: 'right'
    },
    paper: {
        marginTop: 20,
        marginBottom: 20
    }
};

class RoomsTable extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadRides();
    }

    render() {
        const {rides, deleteRide} = this.props;
        return (
            <div>
                <Row>
                    <Col xs={8} xsOffset={2}>
                        <Paper style={styles.paper}>
                            <AppBar
                                title="Listado de Viajes"
                                iconElementLeft={<IconButton><AddIcon/></IconButton>}
                                onLeftIconButtonTouchTap={e => {
                                    browserHistory.push("/rides/add");
                                }}
                            />
                            <Row>
                                <Col xs={10} xsOffset={1}>
                                    <Table selectable={false}>
                                        <TableHeader adjustForCheckbox={false}
                                                     displaySelectAll={false}
                                                     enableSelectAll={false}>
                                            <TableRow>
                                                <TableHeaderColumn>Número</TableHeaderColumn>
                                                <TableHeaderColumn>Dirección</TableHeaderColumn>
                                                <TableHeaderColumn>Responsable</TableHeaderColumn>
                                                <TableHeaderColumn>Fecha de Inicio</TableHeaderColumn>
                                                <TableHeaderColumn>Fecha de Fin</TableHeaderColumn>
                                                <TableHeaderColumn>Operaciones</TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody displayRowCheckbox={false}>
                                            {_.chain(rides).sortBy('id').map(renderRows.bind(null, deleteRide)).value()}
                                        </TableBody>
                                    </Table>
                                </Col>
                            </Row>
                        </Paper>
                    </Col>
                </Row>
            </div>
        );
    }

}

const mapStateToProps = ({rides}) => {
    return {
        rides: rides.get('rides')
    };
};

const mapActionsToProps = dispatch => {
    return bindActionCreators({
        loadRides,
        deleteRide
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(RoomsTable);


