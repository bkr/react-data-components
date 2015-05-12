'use strict';

var React = require('react');



  function SearchField() {
    this.onChange = this.onChange.bind(this);
  }

  Object.defineProperty(SearchField.prototype,"onChange",{writable:true,configurable:true,value:function(e) {
    this.props.onChange(e.target.value);
  }});

  Object.defineProperty(SearchField.prototype,"render",{writable:true,configurable:true,value:function() {
    return (
      React.createElement("div", null, 
        React.createElement("label", {htmlFor: this.props.id}, this.props.label), 
        React.createElement("input", {
          id: this.props.id, 
          type: "search", 
          value: this.props.value, 
          onChange: this.onChange}
        )
      )
    );
  }});



module.exports = SearchField;
