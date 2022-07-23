type AreaId = string

export type TextArea = {
  id: AreaId
  type: 'text'
}

export type LayoutArea = {
  id: AreaId
  type: 'layout'
  direction: 'vertical' | 'horizontal'
  childAreas: [AreaId, AreaId]
}

export type Area = TextArea | LayoutArea

export type Areas = {
  rootId: AreaId
  areas: Record<AreaId, Area>
}
