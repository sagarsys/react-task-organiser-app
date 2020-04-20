import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message } from 'antd';
import './index.less';
import { store } from './store';

console.log(store.getState());

const App = () => {
  const [ date, setDate ] = useState(null);
  const handleChange = date => {
    message.info(`Selected Date: ${date ? date.format('YYYY-MM-DD') : 'None'}`);
    setDate(date);
  };

  return (
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={handleChange} />
          <div style={{ marginTop: 20 }}>
          Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'}
        </div>
    </div>
  )
}

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('app'))
