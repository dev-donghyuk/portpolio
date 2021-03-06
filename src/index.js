// IE11 보기 위함
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import UserContextProvider from './context';
import App from './App';
import './css/reset.css';
import './css/global.css';

// slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

ReactDOM.render(
    // redux provider
    <UserContextProvider>
        <App />
    </UserContextProvider>,
    document.getElementById('root'),
);
