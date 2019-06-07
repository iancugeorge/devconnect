import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getExercise } from '../../actions/execActions';
import TextFieldGroup from '../common/TextFieldGroup';
import { clearExec } from '../../actions/execActions';

class GetExercise extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      errors: {}
    };

    this.getExerciseBtn = (e) => {
      let ids = e.target.id.split(" ");
      let selectedId = Math.floor(Math.random() * (ids.length));
      this.props.getExercise(ids[selectedId]);
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    document.body.querySelector('#input').focus();

    this.state = {};
    this.props.clearExec();
    if (!this.props.auth.isAuthenticated) {
      //this.props.history.push('./');
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
                  id="input"
                  placeholder="Id Problema"
                  name="id"
                  type="number"
                  value={this.state.id.toString()}
                  onChange={this.onChange}
                  error={errors.id}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
              <div className="row">
                <div className="col-md-6">
                  <button onClick={this.getExerciseBtn} id="3 4 5" className="btn btn-info btn-block mt-4">Rotunjire</button>
                  <button onClick={this.getExerciseBtn} id="7 8 9" className="btn btn-info btn-block mt-4">Ordinul cifrelor</button>
                </div>
                <div className="col-md-6">
                  <button onClick={this.getExerciseBtn} id="6" className="btn btn-info btn-block mt-4">Suma cifrelor</button>
                  <button onClick={this.getExerciseBtn} id="15 16 17 18 19" className="btn btn-info btn-block mt-4">Aflarea cifrelor</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

GetExercise.propTypes = {
  clearExec: PropTypes.func.isRequired,
  getExercise: PropTypes.func.isRequired,
  exec: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  exec: state.exec,
  errors: state.errors
});

export default connect(mapStateToProps, { getExercise, clearExec })(GetExercise);