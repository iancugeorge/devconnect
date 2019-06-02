import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postExercise } from '../../actions/execActions';
import TextFieldGroup from '../common/TextFieldGroup';

class PostExercise extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      text: '',
      valCalc: [{
        name: ''
      }],
      valInit: [{
        name: ''
      }],
      result: '',

      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {

    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('./');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.exec.isRetrived) {
      this.props.history.push(`./exercise`);
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

    const newExercise = {
      id: this.state.id,
      text: this.state.text,
      valInit: [
        {
          name: this.state.valInit[0].name,
          min: this.state.valInit[0].min,
          max: this.state.valInit[0].max
        }
      ],
      valCalc: [
        {
          name: this.state.valCalc[0].name,
          val: this.state.valCalc[0].val
        }
      ],
      result: this.state.result
    }

    this.props.postExercise(newExercise);
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
                  error={errors.id}
                />
                <TextFieldGroup
                  placeholder="Text Problema"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />

                {/* <TextFieldGroup
                  placeholder="Variabila Initiala"
                  name="valInit_name"
                  value={this.state.valInit}
                  onChange={this.onChange}
                  error={errors}
                />
                <TextFieldGroup
                  placeholder="Variabila Initiala Valoare Minima / Exacta"
                  name="valInit_min"
                  type="number"
                  value={parseInt(this.state.valInit[0].min)}
                  onChange={this.onChange}
                  error={errors}
                />
                <TextFieldGroup
                  placeholder="Variabila Initiala Valoare Maxima"
                  name="valInit_max"
                  type="number"
                  value={parseInt(this.state.valInit[0].max)}
                  onChange={this.onChange}
                  error={errors}
                /> */}

                <TextFieldGroup
                  placeholder="Variabila rezultat"
                  name="result"
                  value={this.state.result}
                  onChange={this.onChange}
                  error={errors.result}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

PostExercise.propTypes = {
  postExercise: PropTypes.func.isRequired,
  exec: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  exec: state.exec,
  errors: state.errors
});

export default connect(mapStateToProps, { postExercise })(PostExercise);