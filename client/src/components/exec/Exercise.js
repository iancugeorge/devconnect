import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { updateVars, toTemplate } from '../../utils/variableUtils';

class Exercise extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      text: '',
      valInit: [],
      valCalc: [],
      result: '',
      response: '',

      isRight: false,
      isWrong: false,
      isChecked: false,

      errors: {}
    };

    // TODO: TOT CE NU E IN REDUX STATE SA SCOT DIN STATE
    this.checkResponse = () => {
      return this.state.result == this.state.response;
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {


    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('./');
    }


    if (!this.props.exec.isRetrived) {
      this.props.history.push('./getexercise');
    }

    const ex = this.props.exec.exercise;
    if (this.props.exec.isRetrived) {
      this.state.id = ex.id;
      this.state.text = ex.text;
      this.state.valInit = ex.valInit;
      this.state.valCalc = ex.valCalc;
      this.state.result = ex.result;

      this.setState({ response: ex.response });
      console.log(this.state);

      updateVars(this.state);
    }
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.isRight && !this.state.isWrong) {
      this.props.history.push(`./getexercise`);
    }

    this.state.isRight = this.checkResponse(this.state.response, this.state.result);
    this.state.isWrong = !this.state.isRight;
    this.state.isChecked = true;

    if (this.state.isRight)
      document.body.querySelector('#btnSubmit').focus();


    this.forceUpdate();
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <small className="text-right">{`#${this.state.id}`}</small>
              <p>{toTemplate(this.state.text)}</p>
              <form onSubmit={this.onSubmit}>

                <TextFieldGroup
                  placeholder="Raspuns"
                  name="response"
                  type="number"
                  value={this.state.response}
                  onChange={this.onChange}
                  error={this.state.isWrong}
                  valid={this.state.isRight}
                />

                <button id="btnSubmit" name="submit" type="submit" className="btn btn-info btn-block mt-4">{this.state.isRight ? "Felicitari" : "Verifica"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

Exercise.propTypes = {
  exec: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  exec: state.exec,
  errors: state.errors
});

export default connect(mapStateToProps)(Exercise);