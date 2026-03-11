import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { AppWrapper } from './features/base/ui/AppWrapper.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWrapper>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </AppWrapper>
  </StrictMode>,
)
