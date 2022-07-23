import styled from "@emotion/styled";
import { FC, useMemo } from "react";
import { Areas, LayoutArea } from "../types";
import { AreaView } from "./AreaView";

type Props = {
  area: LayoutArea;
  areas: Areas;
};

export const AreaContainer: FC<Props> = ({ area, areas }) => {
  const childAreas = useMemo(
    () => area.childAreas.map((areaId) => areas.areas[areaId]),
    [areas, area]
  );

  return (
    <GridContainer>
      {childAreas.map((area) => (
        <AreaView key={area.id} area={area} areas={areas} />
      ))}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
`;
