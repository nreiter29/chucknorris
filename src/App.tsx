import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, Img, Text, Skeleton, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import background from '../assets/frame_0_delay-0.1s.jpg'
import chuckNorris from '../assets/pngegg-modified.png'
import sound from '../assets/X2Download.com - HEHEHEHA clash royal (320 kbps).mp3'
import { useQuery } from 'react-query'
import UseCountDown from 'react-countdown-hook'

const App = () => {
  const hehe = useMemo(() => new Audio(sound), [])
  const quote = useQuery('todos', async ({ signal }) => {
    return fetch('https://api.chucknorris.io/jokes/random', { signal })
      .then(res => res.json())
      .then(res => res.value)
  })
  const initialTime = 30 * 1000
  const interval = 1000
  const [timeLeft, { start, reset }] = UseCountDown(initialTime, interval)

  useEffect(() => {
    start()
  }, [])

  useEffect(() => {
    if (timeLeft / 1000 == 0) {
      quote.refetch()
      start()
    }
  }, [timeLeft])

  return (
    <Box position="relative" w="100vw" h="100vh" bgColor="black" py="10vh">
      <Box pos="relative" w="100%" h="100%">
        <Box bgImage={background} w="100%" h="100%" bgRepeat="no-repeat" bgPosition="center" bgSize="cover" opacity="0.5" position="absolute"/>
        <Box w="100%" h="100%" display="flex" alignItems="end" position="relative">
          <Img src={chuckNorris} position="relative" h={['1%', '20%', '30%', '40%', '50%', '70%']} w="auto"/>
          <Box display="flex" alignItems="center" flexDirection="column" h="full" justifyContent="center" position="relative" >
            <Box display="flex" alignItems="end" w="full">
              <CircularProgress value={timeLeft / 1000} max={30} isIndeterminate={!quote.isFetched} color="orange.500" size="100px" trackColor="whiteAlpha.300" mb="20px">
                <CircularProgressLabel color="white">{timeLeft / 1000}</CircularProgressLabel>
              </CircularProgress>
            </Box>
            <Skeleton isLoaded={quote.isFetched}>
              <Text
                color="white"
                fontSize={['30px', '35px', '40px', '32px', '35px', '48px']}
                fontWeight={300}
                mb="30px"
                position="relative"
                _before={{
                  content: '"\\FF02"',
                  color: 'orange.500',
                  fontSize: ['50px', '70px', '80px', '100px', '128px'],
                  position: 'absolute',
                  top: '-80px',
                  left: '-89px',
                }}
              >
                {quote.data}
              </Text>
            </Skeleton>
            <Box display="flex" alignItems="end" w="full" h="40px" textAlign="center">
              <Button
                colorScheme="orange"
                w={['100%', 'auto']}
                onClick={() => {
                  hehe.play()
                  quote.refetch()
                  reset()
                  start()
                }}
                fontWeight={300}
              >
                New Fact
              </Button>

            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default App
