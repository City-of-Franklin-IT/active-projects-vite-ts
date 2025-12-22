import { MemoryRouter } from "react-router"
import { screen, render, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MapProvider } from "@/components/map/context"
import { useHandleMapOptionsContainer } from "./hooks"

// Components
import MapOptionsContainer from "."

describe('MapOptionsContainer', () => {

  it('Updates state on button click', async () => {
    const TestComponent = () => {
      const { activeBtn } = useHandleMapOptionsContainer()

      const label = `Active Button: ${ activeBtn }`

      return (
        <>
          <span data-testid="test-span">{label}</span>
          <MapOptionsContainer projects={[]} />
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

    await userEvent.click(screen.getAllByRole('button')[0]) // Legend button

    await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Active Button: Legend'))
  })
})