import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock ResizeObserver for ArcGIS
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

vi.mock('@arcgis/core/Map', () => ({
  default: vi.fn(() => ({}))
}))

vi.mock('@arcgis/core/views/MapView', () => ({
  default: vi.fn(() => ({}))
}))

vi.mock('@arcgis/core/geometry/Point', () => ({
  default: vi.fn(() => ({}))
}))

vi.mock('@arcgis/core/Graphic', () => ({
  default: vi.fn(() => ({}))
}))

vi.mock('@arcgis/core/layers/GraphicsLayer', () => ({
  default: vi.fn(() => ({}))
}))

vi.mock('@arcgis/core/symbols/PictureMarkerSymbol', () => ({
  default: vi.fn(() => ({}))
}))

vi.mock('@arcgis/core/widgets/Search', () => ({
  default: vi.fn(() => ({}))
}))

vi.mock('@arcgis/core/symbols', () => ({
  TextSymbol: vi.fn(() => ({}))
}))

vi.mock('@arcgis/core/geometry/Multipoint', () => ({
  default: vi.fn(() => ({}))
}))