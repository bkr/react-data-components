'use strict';

var React = require('react');

var ____Class1=React.Component;for(var ____Class1____Key in ____Class1){if(____Class1.hasOwnProperty(____Class1____Key)){SearchField[____Class1____Key]=____Class1[____Class1____Key];}}var ____SuperProtoOf____Class1=____Class1===null?null:____Class1.prototype;SearchField.prototype=Object.create(____SuperProtoOf____Class1);SearchField.prototype.constructor=SearchField;SearchField.__superConstructor__=____Class1;

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
