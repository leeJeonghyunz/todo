import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoryState, toDoSelector } from "./api";
import Create from "./Create";
import ToDo from "./ToDo";
import { MouseEvent } from "react";
import styled from "styled-components";

function ToDoList() {
  const setCategory = useSetRecoilState(categoryState);
  const toDo = useRecoilValue(toDoSelector);
  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    setCategory(event.currentTarget.id as Categories);
  };
  console.log(toDo);

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid red;
    padding: 2rem;
  `;

  const Title = styled.h1`
    font-size: 3rem;
    color: ${(props) => props.theme.accentColor};
    font-weight: 600;
    margin-bottom: 2rem;
  `;

  const CategoryWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 25rem;
  `;

  const CategoryTab = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 3px solid ${(props) => props.theme.accentColor};
    width: 7rem;
    height: 3rem;
    background-color: ${(props) => props.theme.boxColor};
    font-weight: 600;
    color: ${(props) => props.theme.accentColor};
    cursor: pointer;

    &:active {
      background-color: ${(props) => props.theme.accentColor};
      color: ${(props) => props.theme.boxColor};
      border: 3px solid ${(props) => props.theme.boxColor};
    }
  `;

  return (
    <Container>
      <Title>To Do</Title>
      <CategoryWrapper>
        <CategoryTab onClick={onClick} id={Categories.TO_DO}>
          TO DO
        </CategoryTab>
        <CategoryTab onClick={onClick} id={Categories.DOING}>
          DOING
        </CategoryTab>
        <CategoryTab onClick={onClick} id={Categories.DONE}>
          DONE
        </CategoryTab>
      </CategoryWrapper>
      <Create />
      <ul>
        {toDo.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
    </Container>
  );
}
export default ToDoList;
