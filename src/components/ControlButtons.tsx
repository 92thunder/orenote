import { FC, useCallback } from 'react'
import styled from '@emotion/styled'
import { IconButton, Tooltip } from '@mui/material'
import {
  CancelPresentation,
  CheckCircle,
  Edit,
  Splitscreen,
} from '@mui/icons-material'
import { closeArea, editModeState, splitArea } from '../libs/area'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { activeAreaState, areasState } from '../libs'
import { deleteText } from '../hooks/useMyText'

export const ControlButtons: FC = () => {
  const activeAreaId = useRecoilValue(activeAreaState)
  const setAreas = useSetRecoilState(areasState)

  const handleClickSplitVertical = useCallback(() => {
    if (!activeAreaId) return
    setAreas((areas) =>
      splitArea(areas, { activeAreaId, direction: 'vertical' })
    )
  }, [activeAreaId, setAreas])
  const handleClickSplitHorizontal = useCallback(() => {
    if (!activeAreaId) return
    setAreas((areas) =>
      splitArea(areas, { activeAreaId, direction: 'horizontal' })
    )
  }, [activeAreaId, setAreas])
  const handleClickCloseArea = useCallback(() => {
    if (!activeAreaId) return
    setAreas((areas) => closeArea(areas, activeAreaId))
    deleteText(activeAreaId)
  }, [activeAreaId, setAreas])

  const [editMode, setEditMode] = useRecoilState(editModeState)

  return (
    <ControlButtonsContainer>
      {editMode ? (
        <>
          <Tooltip title="Split Horizontal" placement="right">
            <IconButton onClick={handleClickSplitHorizontal}>
              <SplitscreenHorizontal fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Split Vertical" placement="right">
            <IconButton onClickCapture={handleClickSplitVertical}>
              <Splitscreen fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Close Area" placement="right">
            <IconButton onClick={handleClickCloseArea}>
              <CancelPresentation fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Finish Edit Mode" placement="right">
            <IconButton onClick={() => setEditMode(false)}>
              <CheckCircle fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Edit" placement="right">
          <IconButton onClick={() => setEditMode(true)}>
            <Edit fontSize="inherit" />
          </IconButton>
        </Tooltip>
      )}
    </ControlButtonsContainer>
  )
}

const ControlButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const SplitscreenHorizontal = styled(Splitscreen)`
  transform: rotate(90deg);
`
