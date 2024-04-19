import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./components/App/App.jsx";
import store from "./redux/store.js";
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* need the provider to give the app access to the store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
