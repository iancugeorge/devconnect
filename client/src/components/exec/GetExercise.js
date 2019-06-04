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

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {

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
                  placeholder="Id Problema"
                  name="id"
                  type="number"
                  value={this.state.id.toString()}
                  onChange={this.onChange}
                  error={errors.id}
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