import styled from '@emotion/styled'
import { ChangeEvent, FC, useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useMyText } from '../../../hooks/useMyText'
import { activeAreaState, editModeState } from '../atoms'
import { TextArea as TextAreaType } from '../types'

type Props = {
  area: TextAreaType
}

export const MyTextArea: FC<Props> = ({ area }) => {
  const editMode = useRecoilValue(editModeState)
  const setActiveArea = useSetRecoilState(activeAreaState)
  const { text, saveMyText } = useMyText(area.id)
  const handleChangeMarkdown = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      saveMyText(event.target.value)
    },
    [saveMyText]
  )
  return (
    <TextArea
      onFocus={() => {
        setActiveArea(area.id)
      }}
      defaultValue={text}
      onChange={handleChangeMarkdown}
      spellCheck={false}
      readOnly={!editMode}
    />
  )
}

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 8px;
  min-height: 0px;
  box-sizing: border-box;
  border: 1px solid #444;
  resize: none;
  line-height: 1.5;
  font-size: 16px;
  :focus {
    outline: 1px #777 solid;
  }
`
