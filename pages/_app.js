/** @jsximport 'theme-ui' */ 

import { ThemeProvider } from 'theme-ui'
import Theme from '../styles/theme-ui'

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={Theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
