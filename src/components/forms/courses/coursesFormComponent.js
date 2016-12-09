import React, {Component} from 'react';
import {Field, reduxForm, FieldArray} from 'redux-form';
import {renderTextField} from '../../../utils/reduxForm';
import {Row, Col} from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

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

const renderMicroCurriculum = ({fields, meta: {touched, error}}) => (
    <Row>
        <Col xs={12}>
            <FlatButton label={"Agregar Micro curriculo"} onClick={() => fields.push({})} primary={true}/>
            {touched && error && <span>{error}</span>}
        </Col>
        <Col xs={12}>
            <Row>
                {fields.map((member, index) =>
                    <Col xs={4} key={index}>
                        <FlatButton
                            label="Eliminar"
                            onClick={() => fields.remove(index)}
                            secondary={true}
                        />
                        <h4>Curriculo #{index + 1}</h4>
                        <Field
                            name={`${member}.semester`}
                            type="text"
                            component={renderTextField}
                            label="Semester"/>
                        <Field
                            name={`${member}.link`}
                            type="text"
                            component={renderTextField}
                            label="Link"/>
                    </Col>
                )}
            </Row>
        </Col>
    </Row>
);

class coursesForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <Row>
                <Col xs={8} xsOffset={2}>
                    <Paper style={styles.paper}>
                        <Row>
                            <Col xs={10} xsOffset={1}>
                                <h1 style={{textAlign: 'center', fontWeight: 400}}>Registro de Cursos</h1>
                                <form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col xs={6}>
                                            <Field name="code" component={renderTextField} label="Código"/>
                                        </Col>
                                        <Col xs={6}>
                                            <Field name="name" component={renderTextField} label="Nombre"/>
                                        </Col>
                                        <Col xs={6}>
                                            <Field name="credits" type="number" component={renderTextField}
                                                   label="Creditos"/>
                                        </Col>
                                        <Col xs={6}>
                                            <Field name="intensity" component={renderTextField} label="Intensidad"/>
                                        </Col>
                                        <Col xs={6}>
                                            <Field name="version" component={renderTextField} label="Version"/>
                                        </Col>
                                        <Col xs={6}>
                                            <Field name="type" component={renderTextField} label="Tipo"/>
                                        </Col>
                                        <Col xs={12}>
                                            <FieldArray name="microCurriculum" component={renderMicroCurriculum}/>
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

// Decorate the form component
coursesForm = reduxForm({
    form: 'courses' // a unique name for this form
})(coursesForm);

export default coursesForm;