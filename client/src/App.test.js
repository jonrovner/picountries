import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react';
//import App from './App';
import CountryDetail from './components/CountryDetail'
import { Provider } from 'react-redux';
import  store  from './store';

test('renders country details', () => {
  render(
  <Provider store={store} >
    
    <CountryDetail />;

  </Provider>)
  const linkElement = screen.getByText('Capital:');
  expect(linkElement).toBeInTheDocument();
});

test('renders other stuff', () => {
  render(
  <Provider store={store} >
    
    <CountryDetail />;

  </Provider>)
  const linkElement = screen.getByText('Population:');
  expect(linkElement).toBeInTheDocument();
});
