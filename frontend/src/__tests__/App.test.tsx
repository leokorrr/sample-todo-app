import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App...', () => {
  it('renders correctly', () => {
    render(<App />)

    const header = screen.getByText(/Todo/i)
    expect(header).toBeInTheDocument()

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()

    const addButton = screen.getByRole('button', {
      name: /add/i
    })

    expect(addButton).toBeInTheDocument()
    expect(addButton).toBeDisabled()
  })
})
