import '@fontsource/red-hat-display/400.css'
import '@fontsource/red-hat-display/500.css'
import '@fontsource/red-hat-display/700.css'
import '@fontsource/red-hat-display/900.css'

// TODO: ADD BUTTON VARIANTS
const themeDark = {
  space: [
    0,
    4,
    8,
    16,
    32,
    64,
    128,
    256,
    512
  ],
  fonts: {
    body: 'Red Hat Display, system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontSizes: [
    12,
    14,
    16,
    20,
    24,
    32,
    48,
    64,
    96
  ],
  fontWeights: {
    body: 400,
    medium: 500,
    heading: 700,
    bold: 700,
    black: 900,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  radii: {
    none: 0,
    sm: '.25rem',
    default: '0.75rem',
    lg: '1.0rem',
    xl: '1.25rem',
    full: '9999px',
  },
  colors: {
    text: '#ffffff',
    textOnLight: '#000',
    background: '#241b3a',
    primary: '#f6da86',
    secondary: '#d0e1d4',
    muted: '#5b546b',
    lightBackground: '#5B546B',
    red: '#F25F5C'
  },
  sizes: {
      // ADD NAVBAR/OTHER SHARED SIZES HERE
  },
  buttons: {
    primary: {
      p: '12px',
      fontWeight: 'bold',
      color: 'textOnLight',
      bg: 'primary',
      cursor: 'pointer',
      '&:hover': {
        filter: 'brightness(0.9)',
      },
      borderRadius: 'default',
    },
    secondary: {
      p: '12px',
      fontWeight: 'bold',
      color: 'black',
      bg: 'secondary',
      cursor: 'pointer',
      '&:hover': {
        filter: 'brightness(0.9)',
      },
      borderRadius: 'default',
    },
    square: {
      height: '48px',
      width: '48px',
      p: '8px',
      fontWeight: 'bold',
      color: 'black',
      bg: 'white',
      cursor: 'pointer',
      '&:hover': {
        filter: 'brightness(0.9)',
      },
      borderRadius: 'default',
    },
    disabled: {
      p: '12px',
      fontWeight: 'bold',
      color: 'white',
      bg: '#8c7c4c',
      borderRadius: 'ldefaultg',
    },
    roomTabsActive: {
      p: '12px',
      px: 4,
      fontWeight: 'bold',
      color: 'textOnLight',
      bg: 'white',
      cursor: 'pointer',
      '&:hover': {
        filter: 'brightness(0.9)',
      },
      borderRadius: 'default',
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0' 
    },
    roomTabsInactive: {
      p: '12px',
      px: 4,
      fontWeight: 'bold',
      color: 'text',
      bg: 'lightBackground',
      cursor: 'pointer',
      '&:hover': {
        filter: 'brightness(0.9)',
      },
      borderRadius: 'default',
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0' 
    }
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body'
    },
    h1: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 5
    },
    h2: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 4
    },
    h3: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 3
    },
    h4: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 2
    },
    h5: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 1
    },
    h6: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 0
    },
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body'
    },
    a: {
      color: 'primary'
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit'
      }
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    },
    img: {
      maxWidth: '100%'
    }
  }
}

export default themeDark
