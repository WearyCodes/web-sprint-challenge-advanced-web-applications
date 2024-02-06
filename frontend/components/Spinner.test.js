// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
import React from "react"
import { render, screen } from "@testing-library/react"
import Spinner from "./Spinner"
import App from "./App"
test('Spinner works', () => {
  render(<Spinner on={true}/>)
  const text = screen.getByText('Please wait...')
  expect(text).toBeTruthy()
})
