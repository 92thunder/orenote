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
        <FlexItem key={area.id}>
          <AreaView key={area.id} area={area} areas={areas} />
        </FlexItem>
      ))}
    </GridContainer>
  )
}

const GridContainer = styled.div<{ $direction: 'vertical' | 'horizontal' }>`
  height: 100%;
  display: flex;
  flex-direction: ${(props) =>
    props.$direction === 'vertical' ? 'column' : 'row'};
`

const FlexItem = styled.div`
  flex: 1;
  overflow: hidden;
  min-width: 200px;
  min-height: 100px;
  max-height: 100%;
`
