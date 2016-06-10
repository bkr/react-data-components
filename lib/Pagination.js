'use strict';

var React = require('react');
var $__0=    React,PropTypes=$__0.PropTypes;

// Used to cancel events.
var preventDefault = function(e)  {return e.preventDefault();};

var ____Class0=React.Component;for(var ____Class0____Key in ____Class0){if(____Class0.hasOwnProperty(____Class0____Key)){Pagination[____Class0____Key]=____Class0[____Class0____Key];}}var ____SuperProtoOf____Class0=____Class0===null?null:____Class0.prototype;Pagination.prototype=Object.create(____SuperProtoOf____Class0);Pagination.prototype.constructor=Pagination;Pagination.__superConstructor__=____Class0;function Pagination(){if(____Class0!==null){____Class0.apply(this,arguments);}}

  Object.defineProperty(Pagination.prototype,"shouldComponentUpdate",{writable:true,configurable:true,value:function(nextProps) {
    var props = this.props;

    return props.totalPages !== nextProps.totalPages ||
      props.currentPage !== nextProps.currentPage ||
      props.showPages !== nextProps.showPages;
  }});

  Object.defineProperty(Pagination.prototype,"onChangePage",{writable:true,configurable:true,value:function(pageNumber, event) {
    event.preventDefault();
    this.props.onChangePage(pageNumber);
  }});

  Object.defineProperty(Pagination.prototype,"render",{writable:true,configurable:true,value:function() {
    var $__0=      this.props,totalPages=$__0.totalPages,showPages=$__0.showPages,currentPage=$__0.currentPage;

    if (totalPages === 0) {
      return null;
    }

    var diff = Math.floor(showPages / 2),
        start = Math.max(currentPage - diff, 0),
        end = Math.min(start + showPages, totalPages);

    if (totalPages >= showPages && end >= totalPages) {
      start = totalPages - showPages;
    }

    var buttons = [], btnEvent, isCurrent;
    for (var i = start; i < end; i++) {
      isCurrent = currentPage === i;
      // If the button is for the current page then disable the event.
      if (isCurrent) {
        btnEvent = preventDefault;
      } else {
        btnEvent = this.onChangePage.bind(this, i);
      }
      buttons.push(
        React.createElement("li", {key: i, className: isCurrent ? 'active' : null}, 
          React.createElement("a", {role: "button", href: "#", onClick: btnEvent, tabIndex: "0"}, 
            React.createElement("span", null, i + 1), 
            isCurrent ?
              React.createElement("span", {className: "sr-only"}, "(current)") : null
          )
        )
      );
    }

    // First and Prev button handlers and class.
    var firstHandler = preventDefault;
    var prevHandler = preventDefault;
    var isNotFirst = currentPage > 0;
    if (isNotFirst) {
      firstHandler = this.onChangePage.bind(this, 0);
      prevHandler = this.onChangePage.bind(this, currentPage - 1);
    }

    // Next and Last button handlers and class.
    var nextHandler = preventDefault;
    var lastHandler = preventDefault;
    var isNotLast = currentPage < totalPages - 1;
    if (isNotLast) {
      nextHandler = this.onChangePage.bind(this, currentPage + 1);
      lastHandler = this.onChangePage.bind(this, totalPages - 1);
    }

    return (
      React.createElement("ul", {className: this.props.className, "aria-label": "Pagination"}, 
        React.createElement("li", {className: !isNotFirst ? 'disabled' : null}, 
          React.createElement("a", {role: "button", href: "#", tabIndex: "0", 
            onClick: firstHandler, 
            "aria-disabled": !isNotFirst, 
            "aria-label": "First"}, 
            React.createElement("span", {className: "fa fa-angle-double-left", "aria-hidden": "true"})
          )
        ), 
        React.createElement("li", {className: !isNotFirst ? 'disabled' : null}, 
          React.createElement("a", {role: "button", href: "#", tabIndex: "0", 
            onClick: prevHandler, 
            "aria-disabled": !isNotFirst, 
            "aria-label": "Previous"}, 
            React.createElement("span", {className: "fa fa-angle-left", "aria-hidden": "true"})
          )
        ), 
        buttons, 
        React.createElement("li", {className: !isNotLast ? 'disabled' : null}, 
          React.createElement("a", {role: "button", href: "#", tabIndex: "0", 
            onClick: nextHandler, 
            "aria-disabled": !isNotLast, 
            "aria-label": "Next"}, 
            React.createElement("span", {className: "fa fa-angle-right", "aria-hidden": "true"})
          )
        ), 
        React.createElement("li", {className: !isNotLast ? 'disabled' : null}, 
          React.createElement("a", {role: "button", href: "#", tabIndex: "0", 
            onClick: lastHandler, 
            "aria-disabled": !isNotLast, 
            "aria-label": "Last"}, 
            React.createElement("span", {className: "fa fa-angle-double-right", "aria-hidden": "true"})
          )
        )
      )
    );
  }});


Pagination.propTypes = {
  onChangePage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  showPages: PropTypes.number
};

Pagination.defaultProps = {
  showPages: 5
};


module.exports = Pagination;
