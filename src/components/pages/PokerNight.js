import React from 'react';
import scores from '../../constants/poker';
// https://react-table.js.org/#/story/readme
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const PokerNight = () => {
  // sort the names
  let PN = [...scores].sort((a, b) => {
    if (!a.total) {
      let total = 0;
      Object.keys(a.scores).forEach(s => (total += a.scores[s]));
      a.total = total;
    }
    if (!b.total) {
      let total = 0;
      Object.keys(b.scores).forEach(s => (total += b.scores[s]));
      b.total = total;
    }
    if (a.total < b.total) {
      return -1;
    } else if (a.total > b.total) {
      return 1;
    } else {
      return 0;
    }
  });

  // names
  let columns = [{ Header: 'Player', accessor: 'name', minWidth: 60 }];

  // all scores
  let totalErrorMargin = 0;
  Object.keys(PN[0].scores).forEach(k => {
    // calculate error margin
    let err = 0;
    PN.forEach(p => (err += isNaN(p.scores[k]) ? 0 : p.scores[k]));
    totalErrorMargin += err;
    // add the column to the table
    columns.push({
      Header: k,
      accessor: `scores.${k}`,
      minWidth: 40,
      Footer: <span>Err: {err}</span>
    });
  });

  // total score
  columns.push({
    id: 'total',
    Header: 'Total',
    minWidth: 50,
    accessor: 'total',
    Footer: <span>Err: {totalErrorMargin}</span>
  });

  // styling for when the table gets too large
  const styles = {
    // position: 'absolute',
    // top: 79,
    // bottom: 15,
    // left: 15,
    // right: 15
  };

  const defaultSort = [{ id: 'total', desc: true }];

  return (
    <ReactTable
      className="-striped -highlight"
      defaultPageSize={PN.length}
      data={PN}
      columns={columns}
      resizable={false}
      showPagination={false}
      style={styles}
      defaultSortDesc
      defaultSorted={defaultSort}
    />
  );
};

export default PokerNight;
