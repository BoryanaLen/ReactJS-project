import React from 'react';
import { render, screen } from '@testing-library/react';
import { AllEmployees } from './AllEmployess';
import { AuthContext } from '../../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom'

test('all employees page renders correctly', async () => {
    const fakeEmployees = [
        {
            firstName: 'testFirstName',
            lastName: 'lastName',
            email: 'resr@test.com',
            phoneNumber: '123456',
            department: 'Marketing',
            position: 'test position',
            joinDate: '',
            address: ''
        }
    ]

    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve(data => {
             Promise.resolve(fakeEmployees)
        })
    );

    render(
     <AuthContext.Provider value={{ userLogin: jest.fn(), role: 'admin' }}>
         <BrowserRouter>
            <AllEmployees/>
         </BrowserRouter>        
      </AuthContext.Provider>
    )
    
    const element = await screen.findAllByText('Add Employee')

    expect(element).toBeInTheDocument();
})