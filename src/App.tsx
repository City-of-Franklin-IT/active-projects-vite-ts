import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { APP_BASE } from "./config"
import { AppProvider } from "./context/App/AppContext"

// Components
import Home from "./pages/Home"

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Router basename={APP_BASE}>
          <Routes>
            <Route path={'/'} element={<Home />} />
          </Routes>
        </Router>
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App