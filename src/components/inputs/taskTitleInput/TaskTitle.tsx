import { useRef, useState } from 'react';
import upperFirst from 'lodash/upperFirst';

import * as S from './TaskTitle.styled';
import { ITaskInput } from './TaskTitle.types';

const TaskTitle = ({
  watch,
  setValue,
  isCreateTask,
}: ITaskInput): JSX.Element => {
  const inputRef = useRef<HTMLParagraphElement>(null);
  const [isEditable, setIsEditable] = useState(!!isCreateTask);
  const fieldName = 'title';

  const finalizeEdit = (): void => {
    const el = inputRef.current!;

    const value = el.innerText.trim();

    setValue(fieldName, value, { shouldValidate: true });
    if (!isCreateTask) {
      setIsEditable(false);
    }
  };

  return (
    <S.TaskInputContainer>
      <S.Label>{upperFirst(fieldName)} </S.Label>
      <S.EditableDiv
        onMouseDown={() => setIsEditable(true)}
        ref={inputRef}
        contentEditable={isEditable}
        suppressContentEditableWarning
        onBlur={finalizeEdit}
        $isCreateTask={isCreateTask}
      >
        {watch(fieldName)}
      </S.EditableDiv>
    </S.TaskInputContainer>
  );
};

export default TaskTitle;
