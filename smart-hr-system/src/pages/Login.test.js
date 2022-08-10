import React from 'react';
import { render, screen } from '@testing-library/react';
import { Login } from './Login';
import { AuthContext } from '../contexts/AuthContext';
import {BrowserRouter} from 'react-router-dom'

test('login page renders correctly', async () => {
    render(
     <AuthContext.Provider value={{ userLogin: jest.fn() }}>
         <BrowserRouter>
            <Login/>
         </BrowserRouter> 
        
      </AuthContext.Provider>
    )
    
    const element = await screen.findByText('Access to our dashboard')

    expect(element).toBeInTheDocument();
})