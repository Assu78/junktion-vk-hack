import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import connect from '@vkontakte/vkui-connect';

connect.send('VKWebAppInit', {});

ReactDOM.render(<App />, document.getElementById('root'));
