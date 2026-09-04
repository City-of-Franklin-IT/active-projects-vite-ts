import { BrowserRouter as Router, Routes, Route } from "react-router"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Components
import Home from "./pages/Home"

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router basename={import.meta.env.VITE_APP_BASE}>
        <Routes>
          <Route path={'/'} element={<Home />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App