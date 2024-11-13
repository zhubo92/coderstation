import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {HashRouter} from 'react-router-dom';
import {ConfigProvider} from "antd";
import zhCN from 'antd/locale/zh_CN';
import './style/Reset.css'
import store from './redux/store';
import {Provider} from 'react-redux';
import './style/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <HashRouter>
                <App/>
            </HashRouter>
        </ConfigProvider>
    </Provider>

);
