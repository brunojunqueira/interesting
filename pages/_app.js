import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../contexts/AuthContext'
import { HeaderProvider } from '../contexts/HeaderContext'
import { SizeProvider } from '../contexts/SizeContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return(
    <ChakraProvider>
      <AuthProvider>
        <SizeProvider>
          <HeaderProvider>
            <Component {...pageProps} />
          </HeaderProvider>
        </SizeProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
