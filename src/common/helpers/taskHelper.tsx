import {
  FcLowPriority,
  FcMediumPriority,
  FcHighPriority,
} from 'react-icons/fc';
import { ITaskPriority } from '@common/interfaces/ITask';

export const getPriorityIcon = (
  priority?: ITaskPriority,
  size: number = 20
) => {
  switch (priority) {
    case ITaskPriority.LOW:
      return <FcLowPriority size={size} />;
    case ITaskPriority.MEDIUM:
      return <FcMediumPriority size={size} />;
    case ITaskPriority.HIGH:
      return <FcHighPriority size={size} />;
    default:
      return <></>;
  }
};
