import styled from '@emotion/styled'
import { Help } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material'
import { FC, useState } from 'react'

export const HelpIcon: FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Tooltip title="Keyboard shortcuts" placement="right">
        <IconButton onClick={() => setOpen(true)}>
          <Help fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <StyledDialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Keyboard shortcuts</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Control</TableCell>
                <TableCell>Command</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Heading</TableCell>
                <TableCell>
                  <code># </code> at the beginning of a line
                  <br />
                  support 3 levels.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bullet List</TableCell>
                <TableCell>
                  <code>* </code>, <code>- </code> at the beginning of a line
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bold</TableCell>
                <TableCell>(⌘ or Ctrl) + B</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Link</TableCell>
                <TableCell>Select text and Paste link</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>OK</Button>
        </DialogActions>
      </StyledDialog>
    </>
  )
}

const StyledDialog = styled(Dialog)`
  code {
    background-color: ${(props) => props.theme.palette.info.dark};
    margin-right: 4px;
    padding: 0 2px;
    border-radius: 2px;
  }
`
