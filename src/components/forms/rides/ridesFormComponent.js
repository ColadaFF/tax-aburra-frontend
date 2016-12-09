import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {renderTextField, renderDatePicker, renderSelectField, mapItemsSelect} from '../../../utils/reduxForm';
import {Row, Col} from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {loadCabs, loadCalls, saveRide, loadRide, clearRide} from './ridesDucks';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

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

const validate = values => {
    const errors = {};
    if (values.endDate) {
        if (moment(values.initDate).isAfter(moment(values.endDate))) {
            errors.initDate = "La fecha inicial no puede ser mayor a la fecha final";
            errors.endDate = "La fecha inicial no puede ser mayor a la fecha final";
        }
    }
    if (!values.initDate) {
        errors.initDate = "La fecha de inicio es requerida.";
    }
    if (!values.address) {
        errors.address = "La dirección el requerida.";
    }
    if (!values.responsibleName) {
        errors.responsibleName = "El nombre del responsable es requerido.";
    }

    if (!values.idDriver) {
        errors.idDriver = "El conductor es requerido.";
    }
    if (!values.idCall) {
        errors.idCall = "La llamada es requerida.";
    }
    return errors
};

const mapCalls = (items = []) => {
    return items.map(item => ({
        value: item.id,
        text: item.phoneNumber + ' ' + item.date
    }));
};

const mapCabs = (cabs = []) => {
    return cabs.map(cab => ({
        value: cab.id,
        text: cab.name + ' ' + cab.lastName
    }));
};


class RidesForm extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {loadCabs, loadCalls} = this.props;
        loadCabs();
        loadCalls();

    }

    componentDidMount() {
        const {loadRide, params} = this.props;
        if (_.has(params, 'id')) {
            loadRide(params.id);
        }
    }

    componentWillUnmount() {
        this.props.clearRide();
    }

    render() {
        const {handleSubmit, cabs, calls, saveRide, initialValues} = this.props;
        return (
            <Row>
                <Col xs={8} xsOffset={2}>
                    <Paper style={styles.paper}>
                        <Row>
                            <Col xs={10} xsOffset={1}>
                                <h1 style={{textAlign: 'center', fontWeight: 400}}>Registro de Viajes</h1>
                                <form onSubmit={handleSubmit(saveRide)}>
                                    <Row>
                                        <Col xs={6}>
                                            <Field name="address" component={renderTextField} label="Dirección"/>
                                        </Col>
                                        <Col xs={6}>
                                            <Field name="responsibleName" component={renderTextField}
                                                   label="Nombre responsable"/>
                                        </Col>
                                        <Col xs={6}>
                                            <Field name="initDate" component={renderDatePicker}
                                                   label="Fecha de inicio"/>
                                        </Col>
                                        <Col xs={6}>
                                            <Field name="endDate" component={renderDatePicker} label="Fecha de fin"/>
                                        </Col>
                                        <Col xs={12}>
                                            <Field
                                                name="idDriver"
                                                component={renderSelectField}
                                                label="Conductor"
                                            >
                                                {mapItemsSelect(mapCabs(cabs))}
                                            </Field>
                                        </Col>
                                        <Col xs={12}>
                                            <Field
                                                name="idCall"
                                                component={renderSelectField}
                                                label="Llamada"
                                            >
                                                {mapItemsSelect(mapCalls(calls))}
                                            </Field>
                                        </Col>
                                    </Row>
                                    <RaisedButton style={styles.button} type="submit" label="Guardar"/>
                                </form>
                            </Col>
                        </Row>
                    </Paper>
                </Col>
            </Row>
        );
    }
}

export const mapStateToProps = ({rides}) => {
    const ride = rides.get('ride');
    const updatedRideValues = _.omitBy(ride, _.isNil);

    const initDateFromDb = updatedRideValues.initDate;
    const endDateFromDb = updatedRideValues.endDate;
    const initDate = _.has(updatedRideValues, 'initDate') ? new Date(initDateFromDb) : undefined;
    const endDate = _.has(updatedRideValues, 'endDate') ? new Date(endDateFromDb) : undefined;
    const initState = _.assign({}, ride, {initDate, endDate});
    return {
        cabs: rides.get('cabs'),
        calls: rides.get('calls'),
        initialValues: initState
    };
};

export const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        loadCalls,
        loadCabs,
        saveRide,
        loadRide,
        clearRide
    }, dispatch);
};

// Decorate the form component
RidesForm = reduxForm({
    form: 'rides',
    enableReinitialize: true,
    validate
})(RidesForm);

export default connect(mapStateToProps, mapDispatchToProps)(RidesForm);