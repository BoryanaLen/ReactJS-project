import React from 'react';
import { render, screen } from '@testing-library/react';
import { Login } from './Login';
import { AuthContext } from '../contexts/AuthContext';

test('login page renders correctly', async () => {
      
    render(<Login/>)
    
    const element = await screen.findByText('Access to our dashboard')

    expect(element).toBeInTheDocument();
})