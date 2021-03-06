// IMPORTS
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { updateVars, toTemplate } from '../../utils/variableUtils';
import { clearExec, getExercise } from '../../actions/execActions';

// COMPONENT
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

      isChecked: false,
      isRight: false,
      willRepeat: false,

      errors: {}
    };

    this.checkResponse = () => {
      if (this.state.result == this.state.response) {
        this.state.isRight = true;
        document.body.querySelector('#btnSubmit').focus();
      } else {
        this.state.isRight = false;
        /// CHANGE THE REDUX STATE TO NEXT EXERCISE
        this.props.getExercise(7);
        document.body.querySelector('#txtrsp').focus();
      }
      this.state.isChecked = true;
    }

    this.resetState = () => {
      this.state.id = '';
      this.state.text = '';
      this.state.valInit = [];
      this.state.valCalc = [];
      this.state.result = '';
      this.state.response = '';

      this.state.isChecked = false;
      this.state.isRight = false;
      this.state.willRepeat = false;

      this.state.errors = {};
    }

    this.updateState = () => {
      document.body.querySelector('#txtrsp').focus();

      const ex = this.props.exec.exercise;
      if (this.props.exec.isRetrived) {
        this.state.id = ex.id;
        this.state.text = ex.text;
        this.state.valInit = ex.valInit;
        this.state.valCalc = ex.valCalc;
        this.state.result = ex.result;

        this.setState({ response: '' });

        updateVars(this.state);
        console.log(this.state);
      }
    }
    this.reload = () => {
      //RELOAD COMPONENT
      this.componentDidMount();
    };


    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  componentDidMount() {
    if (!this.props.exec.isRetrived) {
      this.props.history.push('./getexercise');
    } else {
      this.updateState();
    }
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    // IF IS WRONG IT MARKS IT FOR REPEATING
    if (!this.state.isRight && this.state.isChecked) {
      this.state.willRepeat = true;
    }
    // IF IS RIGHT AND WILL NOT REPEAT THEN EXIT
    if (this.state.isRight && this.state.isChecked && !this.state.willRepeat) {
      this.props.clearExec();
      this.props.history.push(`./getexercise`);
    }
    // IF IS RIGHT BUT WILL REPEAT GET ANOTHER EXERCISE AND RELOAD
    if (this.state.isRight && this.state.isChecked && this.state.willRepeat) {
      this.resetState();
      this.reload();
      return;
    }

    // Check the response
    this.checkResponse(this.state.response, this.state.result);

    // Update the component to reflect the answer
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
                  id="txtrsp"
                  placeholder="Raspuns"
                  name="response"
                  type="number"
                  value={this.state.response}
                  onChange={this.onChange}
                  error={!this.state.isRight && this.state.isChecked}
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
  getExercise: PropTypes.func.isRequired,
  clearExec: PropTypes.func.isRequired,
  exec: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  exec: state.exec,
  errors: state.errors
});

export default connect(mapStateToProps, { clearExec, getExercise })(Exercise);