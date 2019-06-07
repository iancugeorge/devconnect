import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { toTemplate } from '../../utils/variableUtils';

class textLesson extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      text: '<H1>Titlu</H1>',

      errors: {}
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <small className="text-right">{`#${this.state.id}`}</small>
            <div className="text"></div>
          </div>
        </div>
      </div>
    )
  }
}

textLesson.propTypes = {
  less: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  less: state.less,
  auth: state.auth
});

export default connect(mapStateToProps)(textLesson);