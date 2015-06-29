'use strict';

var React = require('react');
var { PropTypes } = React;

var simpleGet = key => data => data[key];
var keyGetter = keys => data => keys.map(key => data[key]);

var isEmpty = value => value === undefined || value === null || value === '';

var getCellValue =
  ({ prop, defaultContent, render }, row) => {
    // If value is empty, use defaultContent or the render function, whichever is present
    if (!isEmpty(prop) && isEmpty(row[prop])) {
      return !isEmpty(defaultContent) ? defaultContent : undefined || render ? render(row[prop], row) : undefined
    } else {
      // else use render or the row value.
      return render ? render(row[prop], row) : row[prop]
    }
  }

var getCellClass =
  ({ prop, className }, row) =>
    [
      prop.replace("_", "-"),
      !isEmpty(prop) && isEmpty(row[prop]) ? 'empty-cell' :
        typeof className === 'function' ? className(row[prop], row) :
        className
    ].filter((c) => c).join(" ");

var getThProps =
  ({ thProps }) =>
    thProps ? thProps() : {}

var getTdProps =
  ({ tdProps }, row) =>
    tdProps ? tdProps(row) : {}
 

function buildSortProps(col, sortBy, onSort) {
  var order = sortBy.prop === col.prop ? sortBy.order : 'none';
  var nextOrder = order === 'ascending' ? 'descending' : 'ascending';
  var sortEvent = onSort.bind(null, { prop: col.prop, order: nextOrder });

  return {
    'onClick': sortEvent,
    // Fire the sort event on enter.
    'onKeyDown': e => { if (e.keyCode === 13) sortEvent(); },
    // Prevents selection with mouse.
    'onMouseDown': e => e.preventDefault(),
    'tabIndex': 0,
    'aria-sort': order,
    'aria-label': `${col.title}: activate to sort column ${nextOrder}`
  };
}

class Table {

  constructor() {
    this._headers = [];
  }

  render() {
    var { columns, keys, buildRowOptions, sortBy, onSort } = this.props;

    var headers = columns.map((col, idx) => {
      var sortProps, order;
      // Only add sorting events if the column has a property and is sortable.
      if (typeof onSort === 'function' &&
          col.sortable !== false &&
          'prop' in col) {
        sortProps = buildSortProps(col, sortBy, onSort);
        order = sortProps['aria-sort'];
      }

      var thContent = col.thContent ? col.thContent : <span tabIndex="0">{col.title}</span>

      return (
        <th
          ref={c => this._headers[idx] = c}
          key={idx}
          role="columnheader"
          scope="col"
          className={col.prop.replace("_", "-")}
          {...getThProps(col)}
          {...sortProps}>
          {thContent}
          {typeof order !== 'undefined' ?
            <span className={`sort-icon sort-${order}`} aria-hidden="true" /> :
            null}
        </th>
      );
    });

    var getKeys = Array.isArray(keys) ? keyGetter(keys) : simpleGet(keys);
    var rows = this.props.dataArray.map(
      row =>
        <tr key={getKeys(row)} {...buildRowOptions(row)}>
          {columns.map(
            (col, i) =>
              <td key={i} className={getCellClass(col, row)} {...getTdProps(col, row)}>
                {getCellValue(col, row)}
              </td>
          )}
        </tr>);

    return (
      <table className={this.props.className}>
        <caption className="sr-only" role="alert" aria-live="polite">
          {`Sorted by ${sortBy.prop}: ${sortBy.order} order`}
        </caption>
        <thead>
          <tr>
            {headers}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? rows :
            <tr>
              <td colSpan={columns.length} className="text-center">No data</td>
            </tr>}
        </tbody>
      </table>
    );
  }

}

Table.propTypes = {

  keys: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]).isRequired,

  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    prop: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    render: PropTypes.func,
    sortable: PropTypes.bool,
    defaultContent: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ])
  })).isRequired,

  dataArray: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])).isRequired,

  buildRowOptions: PropTypes.func,

  sortBy: PropTypes.shape({
    prop: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    order: PropTypes.oneOf([ 'ascending', 'descending' ])
  }),

  onSort: PropTypes.func
};

Table.defaultProps = {
  buildRowOptions: () => ({}),
  sortBy: {}
};

module.exports = Table;
