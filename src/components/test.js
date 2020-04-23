/* import React, { Component } from "react";
import PropTypes from 'prop-types'
class Box extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired
    }
    constructor(props){
        super(props)
        
        if(typeof props.name === 'undefined'){
            console.warn("Name is required")
        }
    }
  render() {
    return (
      <div style={{ border: "1px solid #09f", margin: 5, padding: 5 }}>
        {this.props.children}
      </div>
    );
  }
}

export default class test extends Component {
  render() {
    return (
      <div>
        <h4>Children Props</h4>
        <Box>Saludos desde Children1</Box>
        <Box>Saludos desde Children2</Box>
      </div>
    );
  }
}
 */
