import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { useQuery, QueryClientProvider, QueryClient } from 'react-query'

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ChakraProvider>
        <App/>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
