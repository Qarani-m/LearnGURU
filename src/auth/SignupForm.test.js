import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import SignupForm from './SignupForm';

//  Mock signup function
const mockSignup = jest.fn();

// helper function to render the SignupForm props
function renderSignupForm() {
    return render(<SignupForm signup={mockSignup} />);
}

describe("SignupForm", () => {
    it('should submit a filled out signup form', () => {
        const { getByLabelText, getByText } = renderSignupForm();

        // test form data
        fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(getByLabelText('First name'), { target: { value: 'Scott' } });
        fireEvent.change(getByLabelText('Last name'), { target: { value: 'Carey' } });
        fireEvent.change(getByLabelText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(getByLabelText('Password'), { target: { value: 'testpassword' } });

        fireEvent.click(getByText('Submit'));

        // assert the correct data into the signup function
        expect(mockSignup).toHaveBeenCalledWith({
            username: 'testuser',
            first_name: "Scott",
            last_name: 'Carey',
            email: 'test@example.com',
            password: 'testpassword',
            profile_picture: '',
        });
    });

    it('should display form errors if signup fails', async () => {
        // Mock the signup function to return an error
        mockSignup.mockRejectedValue({ message: 'Error message' });

        const { getByLabelText, getByText, findByText } = renderSignupForm();

        // Fill in the form inputs
        fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });

        // Submit the form
        fireEvent.click(getByText('Submit'));

        // Wait for the form error message to appear
        const errorMessage = await findByText('Error message');
        expect(errorMessage).toBeInTheDocument();
    });
});

