import { Area, Areas, LayoutArea } from './types'

export const splitArea = (
  areas: Areas,
  {
    activeAreaId,
    direction,
  }: { activeAreaId: string; direction: LayoutArea['direction'] }
): Areas => {
  const targetArea = areas.areas[activeAreaId]
  if (targetArea.type === 'layout') {
    console.error('Area type must be text.')
    return areas
  }

  const layoutAreaId = crypto.randomUUID()
  const rootId = activeAreaId === areas.rootId ? layoutAreaId : areas.rootId
  const newTextAreaId = crypto.randomUUID()

  const parentArea = Object.values(areas.areas).find((area) => {
    if (area.type === 'text') return false
    return area.childAreas.includes(activeAreaId)
  })
  const getNewParentAreaChildAreas = (
    parentArea: Area
  ): LayoutArea['childAreas'] => {
    if (parentArea.type === 'text') throw new Error('text')
    const newChildAreas = [...parentArea.childAreas]
    const replaceIndex = newChildAreas.findIndex(
      (areaId) => areaId === activeAreaId
    )
    newChildAreas.splice(replaceIndex, 1, layoutAreaId)
    return newChildAreas
  }
  return {
    ...areas,
    rootId,
    areas: {
      ...areas.areas,
      ...(parentArea &&
        parentArea.type === 'layout' && {
          [parentArea.id]: {
            ...parentArea,
            childAreas: getNewParentAreaChildAreas(parentArea),
          },
        }),
      [layoutAreaId]: {
        id: layoutAreaId,
        type: 'layout',
        direction,
        childAreas: [activeAreaId, newTextAreaId],
      },
      [activeAreaId]: {
        id: activeAreaId,
        type: 'text',
      },
      [newTextAreaId]: {
        id: newTextAreaId,
        type: 'text',
      },
    },
  }
}

const getDefaultAreas = (): Areas => {
  const rootId = crypto.randomUUID()
  return {
    rootId,
    areas: {
      [rootId]: {
        id: rootId,
        type: 'text',
      },
    },
  }
}

// let areas: Areas | undefined
export const getAreas = async () => {
  return (
    (await chrome.storage.sync.get('areas').then((value) => {
      return value.areas || getDefaultAreas()
    })) || getDefaultAreas()
  )
}
export const saveAreas = (areas: Areas) => {
  return chrome.storage.sync.set({ areas }).then()
}
