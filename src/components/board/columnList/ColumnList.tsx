import { map } from 'lodash';
import React from 'react';

import { useDndState } from '@common/providers/dndProvider/useDndState';

import Column from './column/Column';

const ColumnList: React.FC = () => {
  const columns = useDndState((state) => state.orderedColumns);

  if (!columns) return null;

  return map(columns, (columnId, i) => {
    return <Column key={i} columnId={columnId} />;
  });
};

export default React.memo(ColumnList);
