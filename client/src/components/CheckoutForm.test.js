import React from 'react';
import { render, fireEvent, getByText, getByTestId } from '@testing-library/react';
import CheckoutForm from './CheckoutForm';

// Write up the two tests here and make sure they are testing what the title shows

test('form header renders', () => {
    const { getByText } = render(<CheckoutForm />);

    const checkoutHeader = getByText(/checkout form/i);
});

test('form shows success message on submit with form details', () => {
  const { getByLabelText, getByTestId, getByDisplayValue } = render(<CheckoutForm />);

  const firstNameInput = getByLabelText(/first name/i);
  const lastNameInput = getByLabelText(/last name/i);
  const addressInput = getByLabelText(/address/i);
  const cityInput = getByLabelText(/city/i);
  const stateInput = getByLabelText(/state/i);
  const zipInput = getByLabelText(/zip/i);

  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(addressInput).toBeInTheDocument();
  expect(cityInput).toBeInTheDocument();
  expect(stateInput).toBeInTheDocument();
  expect(zipInput).toBeInTheDocument();

  fireEvent.change(firstNameInput, { target: { value: 'Matt' }})
  fireEvent.change(lastNameInput, { target: { value: 'Kolmorgen' }})
  fireEvent.change(addressInput, { target: { value: '123 Street' }})
  fireEvent.change(cityInput, { target: { value: 'Madison' }})
  fireEvent.change(stateInput, { target: { value: 'Wisconsin' }})
  fireEvent.change(zipInput, { target: { value: 12345 }})

  expect(getByDisplayValue(/Matt/i)).toBeInTheDocument()
  expect(getByDisplayValue(/kolmorgen/i)).toBeInTheDocument()
  expect(getByDisplayValue(/123 street/i)).toBeInTheDocument()
  expect(getByDisplayValue(/madison/i)).toBeInTheDocument()
  expect(getByDisplayValue(/wisconsin/i)).toBeInTheDocument()
  expect(getByDisplayValue(/12345/i)).toBeInTheDocument()

  const checkoutSubmit = getByTestId(/submitCheckout/i);
  expect(checkoutSubmit).toBeInTheDocument();
  fireEvent.click(checkoutSubmit)

  const successMessage = getByTestId(/successMessage/i)
  expect(successMessage).toBeInTheDocument()
});