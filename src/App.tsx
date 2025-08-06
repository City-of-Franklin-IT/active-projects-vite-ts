import { BrowserRouter as Router, Routes, Route } from "react-router"
import { QueryClientProvider, QueryClient } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { APP_BASE } from "./config"

// Components
import Home from "./pages/Home"

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router basename={APP_BASE}>
        <Routes>
          <Route path={'/'} element={<Home />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App