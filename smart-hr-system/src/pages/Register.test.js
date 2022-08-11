import React from 'react';
import { render, screen } from '@testing-library/react';
import { Register } from './Register';
import { AuthContext } from '../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom'

test('register page renders correctly', async () => {
    render(
     <AuthContext.Provider value={{ userLogin:
        { user: { email: 'test@test.com'}} }}>
         <BrowserRouter>
            <Register/>
         </BrowserRouter> 
        
      </AuthContext.Provider>
    )
    
    const element = await screen.findByText('Access to our dashboard')

    expect(element).toBeInTheDocument();
})