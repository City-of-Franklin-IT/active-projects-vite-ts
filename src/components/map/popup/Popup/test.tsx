import { useContext, useEffect } from "react"
import { MemoryRouter } from "react-router"
import { screen, render, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import MapCtx, { MapProvider } from "../../context"

// Components
import * as Components from './components'

describe('Popup', () => {

  describe('CloseBtn', () => {
    it('Clears selection from MapCtx on click', async () => {
      const TestComponent = () => {
        const { selection, dispatch } = useContext(MapCtx)

        const label = `Selection: ${ selection }`

        useEffect(() => {
          dispatch({ type: 'SET_SELECTION', payload: 'ABC123' })
        }, [])

        return (
          <>
            <span data-testid="test-span">{label}</span>
            <Components.CloseBtn />
          </>
        )
      }

      render(
        <MemoryRouter>
          <MapProvider>
            <TestComponent />
          </MapProvider>
        </MemoryRouter>
      )

      expect(screen.getByTestId('test-span')).toHaveTextContent('Selection: ABC123')

      await userEvent.click(screen.getByRole('button')) // Clear selection from MapCtx

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Selection:'))
    })
  })
})