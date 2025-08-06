import { useContext } from 'react'
import { MemoryRouter } from 'react-router'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MapCtx, { MapProvider } from '../context'
import * as MockAPI from '@/test/mocks/api'
import { useFilterProjects, useHandleBasemapSelect } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

describe('ProjectsMap', () => {

  describe('useFilterProjects', () => {
    it('Filters projects by filters in MapCtx', async () => {
      const mockParksProjects = Array.from({ length: 10 }).map(() => MockAPI.createMockProject({ type: 'Parks' }))
      const mockTransportationProjects = Array.from({ length: 10 }).map(() => MockAPI.createMockProject({ type: 'Transportation' }))

      const TestComponent = ({ projects }: { projects: AppTypes.ProjectInterface[] }) => {
        const { dispatch } = useContext(MapCtx)

        const filtered = useFilterProjects(projects)

        const onClick = () => {
          dispatch({ type: 'SET_FILTERS', payload: ['Parks'] })
        }

        const label = `Project Count: ${ filtered.length }`

        return (
          <>
            <span data-testid="test-span">{label}</span>
            <button 
              type="button"
              onClick={onClick}>
                Click Me!
            </button>
          </>
        )
      }

      render(
        <MemoryRouter>
          <MapProvider>
            <TestComponent projects={[ ...mockParksProjects, ...  mockTransportationProjects ]} />
          </MapProvider>
        </MemoryRouter>
      )

      expect(screen.getByTestId('test-span')).toHaveTextContent('Project Count: 20')

      await userEvent.click(screen.getByRole('button')) // Filter to only Parks projects

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Project Count: 10'))
    })
  })

  describe('useHandleBasemapSelect', () => {
    it('Updates basemap in MapCtx on change', async () => {
      const TestComponent = () => {

        const { onChange, basemap } = useHandleBasemapSelect()

        const label = `Basemap: ${ basemap }`

        return (
          <>
            <span data-testid="test-span">{label}</span>
            <select onChange={onChange}>
              <option value="navigation-3d"></option>
            </select>
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

      expect(screen.getByTestId('test-span')).toHaveTextContent('Basemap: dark-gray-vector')

      await userEvent.selectOptions(screen.getByRole('combobox'), 'navigation-3d') // Select navigation-3d

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Basemap: navigation-3d'))
    })
  })
})