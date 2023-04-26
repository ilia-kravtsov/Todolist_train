import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {AppWithRedux} from "./components/AppWithRedux";
import {store} from './state/store'
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<Provider store={store}>
        <AppWithRedux/>
    </Provider>
);



