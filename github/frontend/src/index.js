import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; 
import { AppProvider } from './context/productContex';
import store from './redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <AppProvider>
        <App />
      </AppProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
