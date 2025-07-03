import { IDraggingItemType } from '@common/providers/dndProvider/types';

import { UniqueIdentifier } from '@dnd-kit/core';

export interface IDragOverHelper {
  type: IDraggingItemType;
  sourceId: UniqueIdentifier | number;
  targetId: UniqueIdentifier | number | string;
  sourceTaskColumnId?: string;
  targetTaskColumnId?: string;
}
