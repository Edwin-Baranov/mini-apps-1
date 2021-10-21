console.log('Hello from index.jsx');


import Board from './components/Board.jsx';

ReactDOM.render(
  <Board x={7} y={6}/>,
  document.getElementById('app')
);