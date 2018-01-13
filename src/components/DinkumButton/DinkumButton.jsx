import React from 'react'
import './DinkumButton.css'

export default class DinkumButton extends React.Component {
  render() {
    return (
        <button className='dinkum-button' disabled={this.props.disabled} onClick={this.props.onClick}>{this.props.title}</button>

    );
  }
}
