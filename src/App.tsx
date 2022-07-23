import { useEffect, useMemo } from 'react'
import styled from '@emotion/styled'
import { createTheme, ThemeProvider } from '@mui/material'
import { areasState, AreaView, saveAreas } from './libs/area'
import { useRecoilValue } from 'recoil'
import { ControlButtons, InformationButtons } from './components'
import './App.css'

export function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  const areas = useRecoilValue(areasState)
  const rootArea = useMemo(() => {
    return areas.areas[areas.rootId]
  }, [areas])

  useEffect(() => {
    saveAreas(areas)
  }, [areas])

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <StyledAside>
          <ControlButtons />
          <InformationButtons />
        </StyledAside>
        <Main>
          <AreaView area={rootArea} areas={areas} />
        </Main>
      </Container>
    </ThemeProvider>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

const StyledAside = styled.section`
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Main = styled.section`
  flex: 1;
`
