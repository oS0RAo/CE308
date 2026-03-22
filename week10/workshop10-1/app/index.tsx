import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import CartScreen from './screens/CartScreen';

export default function App() {
  return (
    <Provider store={store}>
      <CartScreen />
    </Provider>
  );
}