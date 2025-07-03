import {
  CollisionDetection,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  Modifier,
  SensorDescriptor,
  SensorOptions,
} from '@dnd-kit/core';

export interface IUseDndState {
  dndContext: IDndContext;
}

export interface IDndContext {
  sensors: SensorDescriptor<SensorOptions>[];
  collisionDetection: CollisionDetection;
  onDragStart: (event: DragStartEvent) => void;
  onDragOver: (event: DragOverEvent) => void;
  onDragEnd: (event: DragEndEvent) => Promise<void>;
  modifiers: Modifier[];
}
