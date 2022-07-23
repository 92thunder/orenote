import { useCallback, useMemo } from "react"
import styled from "@emotion/styled"
import "./App.css"
import { createTheme, IconButton, ThemeProvider } from "@mui/material"
import { Splitscreen } from "@mui/icons-material"
import { areasState, AreaView } from "./libs/area"
import { useRecoilState } from "recoil"

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  })

  const [areas, setAreas] = useRecoilState(areasState)
  const rootArea = useMemo(() => {
    return areas.areas[areas.rootId]
  }, [areas])
  const handleClickSplitVertical = useCallback(() => {
    setAreas((oldAreas) => {
      const targetId = 'root'
      const targetArea = oldAreas.areas[targetId]
      const newId1 = crypto.randomUUID()
      const newId2 = crypto.randomUUID()
      return {
        ...oldAreas,
        areas: {
          ...oldAreas.areas,
          [targetId]: {
            ...targetArea,
            type: 'layout',
            direction: 'vertical',
            childAreas: [newId1, newId2]
          },
          [newId1]: {
            id: newId1,
            type: 'text',
            text: targetArea.type === 'text' ? targetArea.text : ''
          },
          [newId2]: {
            id: newId2,
            type: 'text',
            text: '',
          }
        }
      }
    })
  }, [setAreas])

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
  transform: rotate(90deg);
`

export default App
