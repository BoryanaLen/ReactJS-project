import { render, screen } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom'
import App from './App';
import { AuthContext } from './contexts/AuthContext';


test('renders learn react link', () => {
  render(
    <AuthContext.Provider value={{ userLogin: jest.fn(), role: 'user' }}>
        <BrowserRouter>
            <App />
        </BrowserRouter>   
    </AuthContext.Provider>);
  const linkElement = screen.getByText('Access to our dashboard');
  expect(linkElement).toBeInTheDocument();
});
