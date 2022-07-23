import { useCallback, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import './App.css'
import { createTheme, IconButton, ThemeProvider } from '@mui/material'
import { Splitscreen } from '@mui/icons-material'
import { Areas } from './libs'
import { AreaView } from './libs/area'

function App () {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const [areas, setAreas] = useState<Areas>({
    rootId: 'root',
    areas: {
      root: {
        id: 'root',
        type: 'layout',
        direction: 'vertical',
        childAreas: ['A', 'B']
      },
      A: {
        id: 'A',
        type: 'text',
        text: ''
      },
      B: {
        id: 'B',
        type: 'text',
        text: ''
      }
    }
  })
  const rootArea = useMemo(() => {
    return areas.areas[areas.rootId]
  }, [areas])
  const handleClickSplitVertical = useCallback(() => {

  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Main>
          <AreaView area={rootArea} areas={areas} />
        </Main>
        <Footer>
          <IconButton onClick={handleClickSplitVertical} size="small">
            <Splitscreen fontSize="inherit" />
          </IconButton>
          <IconButton size="small">
            <SplitscreenHorizontal fontSize="inherit" />
          </IconButton>
        </Footer>
      </Container>
    </ThemeProvider>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Footer = styled.footer`
  width: 100%;
  padding: 8px;
`

const Main = styled.section`
  flex: 1;
`

const SplitscreenHorizontal = styled(Splitscreen)`
  transform: rotate(90deg)
`

export default App
