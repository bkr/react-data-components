'use strict';

var React = require('react');

var ____Class2=React.Component;for(var ____Class2____Key in ____Class2){if(____Class2.hasOwnProperty(____Class2____Key)){SelectField[____Class2____Key]=____Class2[____Class2____Key];}}var ____SuperProtoOf____Class2=____Class2===null?null:____Class2.prototype;SelectField.prototype=Object.create(____SuperProtoOf____Class2);SelectField.prototype.constructor=SelectField;SelectField.__superConstructor__=____Class2;

  function SelectField() {
    this.onChange = this.onChange.bind(this);
  }

  Object.defineProperty(SelectField.prototype,"onChange",{writable:true,configurable:true,value:function(e) {
    this.props.onChange(e.target.value);
  }});

  Object.defineProperty(SelectField.prototype,"labelContent",{writable:true,configurable:true,value:function() {
    var $__0=    this.props,id=$__0.id,label=$__0.label;

    return label ? (
      React.createElement("label", {htmlFor: id}, label)
    ) : (false)
  }});

  Object.defineProperty(SelectField.prototype,"render",{writable:true,configurable:true,value:function() {
    var $__0=    this.props,id=$__0.id,options=$__0.options,value=$__0.value;
    var mappedOpts =
      options.map(function(each)  {return React.createElement("option", {key: each, value: each}, each);});

    return (
      React.createElement("div", null, 
         this.labelContent(), 
        React.createElement("select", {id: id, value: value, onChange: this.onChange}, 
          mappedOpts
        )
      )
    );
  }});



module.exports = SelectField;
