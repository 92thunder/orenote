import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Link from '@tiptap/extension-link'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FC } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useMyText } from '../../../hooks/useMyText'
import { activeAreaState, editModeState } from '../atoms'
import { TextArea as TextAreaType } from '../types'

type Props = {
  area: TextAreaType
}

export const MyTextArea: FC<Props> = ({ area }) => {
  const editMode = useRecoilValue(editModeState)
  const [activeAreaId, setActiveArea] = useRecoilState(activeAreaState)
  const { text, saveMyText } = useMyText(area.id)
  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
        }),
        Link.configure({
          HTMLAttributes: {
            target: '_self',
          }
        }),
      ],
      content: text,
      editable: editMode,
      onUpdate: ({ editor }) => {
        saveMyText(editor.getHTML())
      },
    },
    [editMode]
  )
  return (
    <Container
      $active={area.id === activeAreaId}
      onClick={() => setActiveArea(area.id)}
    >
      <StyledEditorContent editor={editor} spellCheck={false} />
    </Container>
  )
}

const Container = styled.div<{ $active: boolean }>`
  ${(props) =>
    props.$active
      ? css`
          border: 1px solid #1976d2;
        `
      : css`
          border: 1px solid #666;
        `}
  overflow: hidden;
  box-sizing: border-box;
  height: 100%;
  max-height: 100%;
`

const StyledEditorContent = styled(EditorContent)`
  overflow-y: auto;
  width: 100%;
  height: 100%;
  border: 1px solid #444;
  resize: none;
  line-height: 1.5;
  color: ${(props) => props.theme.palette.text.primary};
  .ProseMirror {
    padding: 0 8px;
    box-sizing: border-box;
    :focus-visible {
      outline: none;
    }
    height: calc(100% - 18px);
  }
  h1 {
    font-size: 22px;
  }
  h2 {
    font-size: 20px;
  }
  h3 {
    font-size: 18px;
  }
  p {
    font-size: 16px;
  }
  ul,
  ol {
    padding-left: 20px;
  }
`
