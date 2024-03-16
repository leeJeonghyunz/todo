import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDo, redlineState, toDoState } from "./api";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

interface ITextProps {
  redline: boolean;
}

const List = styled.li`
  width: 25rem;
  height: 6rem;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 10px;
  margin-top: 1rem;
  padding-left: 0.5rem;
  padding-top: 0.5rem;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Btn = styled.button`
  color: ${(props) => props.theme.boxColor};
  background-color: ${(props) => props.theme.accentColor};
  border: none;
  border-radius: 10px;
  height: 2rem;
  width: 5rem;
  margin-right: 1rem;
  cursor: pointer;
`;

const IconBtn = styled.button`
  color: ${(props) => props.theme.accentColor};
  background-color: ${(props) => props.theme.boxColor};
  border: none;
  border-radius: 10px;
  height: 2rem;
  width: 2rem;
  margin-right: 1rem;
  cursor: pointer;
`;

const Text = styled.span<ITextProps>`
  margin-left: 1rem;
  margin-top: 0.5rem;
  text-decoration: ${(props) => (props.redline ? "line-through" : "none")};
  text-decoration-color: ${(props) => (props.redline ? "red" : "black")};
`;

function ToDo({ text, category, id, check }: IToDo) {
  const redline = useRecoilValue(redlineState);
  const onClickRed = () => {
    setToDoState((oldTodos) => {
      return oldTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            check: !todo.check, // 특정 ToDo 항목의 check 속성을 토글
          };
        }
        return todo;
      });
    });
  };
  const setToDoState = useSetRecoilState(toDoState);
  const onClick = (newCategory: Categories) => {
    setToDoState((oldTodos) => {
      const target = oldTodos.findIndex((todo) => todo.id === id);
      const newTodo = { text, category: newCategory, id, check };
      return [
        ...oldTodos.slice(0, target),
        newTodo,
        ...oldTodos.slice(target + 1),
      ];
    });
  };

  const onDelete = () => {
    setToDoState((oldTodos) => {
      const target = oldTodos.findIndex((todo) => todo.id === id);
      return [...oldTodos.slice(0, target), ...oldTodos.slice(target + 1)];
    });
  };

  console.log(typeof redline);
  return (
    <List>
      <Text redline={check}>{text}</Text>
      <BtnWrapper>
        <div>
          {category !== "TO_DO" && (
            <Btn onClick={() => onClick(Categories.TO_DO)}>To Do</Btn>
          )}
          {category !== "DOING" && (
            <Btn onClick={() => onClick(Categories.DOING)}>Doing</Btn>
          )}
          {category !== "DONE" && (
            <Btn onClick={() => onClick(Categories.DONE)}>Done</Btn>
          )}
        </div>
        <div>
          <IconBtn onClick={onClickRed}>
            <FontAwesomeIcon size="2x" icon={faCircleCheck} />
          </IconBtn>
          <IconBtn onClick={onDelete}>
            <FontAwesomeIcon size="2x" icon={faTrashCan} />
          </IconBtn>
        </div>
      </BtnWrapper>
    </List>
  );
}

export default ToDo;
