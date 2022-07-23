import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FC, useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { areasState } from '../atoms'
import { Areas, LayoutArea } from '../types'
import { AreaView } from './AreaView'

type Props = {
  area: LayoutArea
  areas: Areas
}

export const AreaContainer: FC<Props> = ({ area }) => {
  const areas = useRecoilValue(areasState)
  const childAreas = useMemo(
    () => area.childAreas.map((areaId) => areas.areas[areaId]),
    [area.childAreas, areas.areas]
  )

  return (
    <GridContainer $direction={area.direction}>
      {childAreas.map((area) => (
        <AreaView key={area.id} area={area} areas={areas} />
      ))}
    </GridContainer>
  )
}

const GridContainer = styled.div<{ $direction: 'vertical' | 'horizontal' }>`
  height: 100%;
  display: grid;
  ${(props) =>
    props.$direction === 'vertical' &&
    css`
      grid-template-rows: 1fr 1fr;
    `}
  ${(props) =>
    props.$direction === 'horizontal' &&
    css`
      grid-template-columns: 1fr 1fr;
    `}
`
