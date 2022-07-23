import { Theme as MuiTheme } from '@mui/system'

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
}