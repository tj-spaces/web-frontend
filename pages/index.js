/** @jsximport 'theme-ui' */

import { Grid, Box, Flex, Button, Heading } from 'theme-ui'

const HomeSidebar = () => {
  return (
    <Flex
      sx={{
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <Box>
        <Flex // PROFILE PIC PLACEHOLDER
          sx={{
            borderRadius: 'full',
            p: 3,
            m: 4,
            mr: 2,
            bg: 'white',
            width: '52px',
            height: '52px',
          }}
        />
        <Grid columns={1}>
          <Button variant='roomTabsActive'>Room 1</Button>
          <Button variant='roomTabsInactive'>Room 2</Button>
          <Button variant='roomTabsInactive'>Room 3</Button>
        </Grid>
      </Box>
      <Box>
        <Button
          sx={{
            borderRadius: 0,
            borderTopRightRadius: 'default',
            px: 4,
            width: '100%',
          }}
        >
          Setings
        </Button>
      </Box>
    </Flex>
  )
}

const HomeVideo = () => {
  return (
    <Flex
      sx={{
        p: 4,
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Heading>Nebula</Heading>
      <Box // placeholder video
        sx={{
          mt: 4,
          borderRadius: 'default',
          width: '100%',
          height: '100%',
          bg: 'white',
        }}
      />
      <Flex>
        <Box sx={{ mx: 'auto', mt: 4, mb: 3, display: 'inline-block' }}>
          <Button variant='square' sx={{ mr: 3 }}></Button>
          <Button variant='square' sx={{ mr: 3 }}></Button>
          <Button variant='square' sx={{ mr: 3 }}></Button>
          <Button variant='square' sx={{ mr: 3, bg: 'red' }}></Button>
        </Box>
      </Flex>
    </Flex>
  )
}

const ChatBlock = ({ messages = [], isUser = false, props }) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
      }}
    >
      <Box // PLACEHOLDER PROFILE
        sx={{
          borderRadius: 'full',
          height: '42px',
          width: '42px',
          bg: 'white',
          mb: 2,
        }}
      />
      {messages.map((text) => (
        <Box
          sx={{
            bg: isUser ? 'white' : 'primary',
            color: 'textOnLight',
            p: '12px',
            borderRadius: 'default',
            display: 'inline-block',
            mt: '10px',
          }}
        >
          {text}
        </Box>
      ))}
    </Flex>
  )
}

const HomeChat = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        p: 4,
      }}
    >
      <Heading sx={{ mb: 3 }}>Chat</Heading>
      <ChatBlock messages={['hello', 'bruh shi jian']}></ChatBlock>
      <ChatBlock
        messages={['hello', 'bruh shi jian']}
        isUser={true}
      ></ChatBlock>
    </Box>
  )
}

export default function Home() {
  return (
    <Flex
      sx={{
        height: '100%',
        minHeight: '100vh',
      }}
    >
      <Flex
        sx={{
          width: '15%',
        }}
      >
        <HomeSidebar />
      </Flex>
      <Flex
        sx={{
          width: '55%',
        }}
      >
        <HomeVideo />
      </Flex>
      <Flex
        sx={{
          width: '30%',
        }}
      >
        <HomeChat />
      </Flex>
    </Flex>
  )
}
