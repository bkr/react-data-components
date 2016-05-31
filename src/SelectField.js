'use strict';

var React = require('react');

class SelectField extends React.Component {

  constructor() {
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.onChange(e.target.value);
  }

  labelContent() {
    var {id, label } = this.props;

    return label ? (
      <label htmlFor={id}>{label}</label>
    ) : (false)
  }

  render() {
    var {id, options, value} = this.props;
    var mappedOpts =
      options.map((each) => <option key={each} value={each}>{each}</option>);

    return (
      <div>
        { this.labelContent() }
        <select id={id} value={value} onChange={this.onChange}>
          {mappedOpts}
        </select>
      </div>
    );
  }

}

module.exports = SelectField;
