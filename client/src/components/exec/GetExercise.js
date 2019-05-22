import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getExercise } from '../../actions/execActions';
import TextFieldGroup from '../common/TextFieldGroup';
import { updateVars, toTemplate } from '../../utils/variableUtils';

class GetExercise extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      text: '',
      valInit: [],
      valCalc: [],
      result: '',
      response: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.exec.isRetrived) {


      const ex = nextProps.exec.exercise;
      this.state.id = ex.id;
      this.state.text = ex.text;
      this.state.valInit = ex.valInit;
      this.state.valCalc = ex.valCalc;
      this.state.result = ex.result;
      console.log(this.state);

      updateVars(this.state);


    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.getExercise(this.state.id);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Probleme</h1>
              <p className="lead text-center">Alege Id-ul unei probleme</p>
              <form onSubmit={this.onSubmit}>

                <TextFieldGroup
                  placeholder="Id Problema"
                  name="id"
                  type="number"
                  value={this.state.id.toString()}
                  onChange={this.onChange}
                  errors={this.errors}
                />

                <p>{toTemplate(this.state.text)}</p>
                {this.state.result ?
                  <TextFieldGroup
                    placeholder="Raspuns"
                    name="response"
                    type="number"
                    value={this.state.response}
                    onChange={this.onChange} /> : ''}

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

GetExercise.propTypes = {
  getExercise: PropTypes.func.isRequired,
  exec: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  exec: state.exec,
  errors: state.errors
});

export default connect(mapStateToProps, { getExercise })(GetExercise);