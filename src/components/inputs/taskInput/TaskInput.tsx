import { useRef, useState } from 'react';
import upperFirst from 'lodash/upperFirst';

import * as S from './TaskInput.styled';
import { ITaskInput } from './TaskInput.types';

const TaskInput = ({
  fieldName,
  watch,
  setValue,
  isCreateTask,
}: ITaskInput): JSX.Element => {
  const isTitleView = fieldName === 'title';
  const inputRef = useRef<HTMLParagraphElement>(null);
  const [isEditable, setIsEditable] = useState(isCreateTask);

  const finalizeEdit = (): void => {
    const text = inputRef.current?.innerText.trim() || '';
    setValue(fieldName, text, { shouldValidate: true });
    if (!isCreateTask) {
      setIsEditable(false);
    }
  };

  return (
    <S.TaskInputContainer $isTitleView={isTitleView}>
      <S.Label>{upperFirst(fieldName)}</S.Label>
      <S.EditableDiv
        onMouseDown={() => setIsEditable(true)}
        ref={inputRef}
        contentEditable={isEditable}
        suppressContentEditableWarning
        onBlur={finalizeEdit}
        $isTitleView={isTitleView}
        $isCreateTask={isCreateTask}
      >
        {watch(fieldName)}
      </S.EditableDiv>
    </S.TaskInputContainer>
  );
};

export default TaskInput;
