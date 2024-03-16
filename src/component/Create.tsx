import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "./api";
import styled from "styled-components";

interface IForm {
  toDo: string;
}

const Input = styled.input`
  height: 2rem;
  width: 25rem;
`;

const Horizon = styled.hr`
  margin: 1.5rem 0;
  color: black;
  width: 25rem;
`;

function Create() {
  const setToDo = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setToDo((oldToDos) => [
      { text: toDo, id: Date.now(), category, check: false },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <>
      <Horizon />
      <form onSubmit={handleSubmit(onValid)}>
        {category === "TO_DO" && (
          <Input
            type="text"
            {...register("toDo")}
            placeholder="할 일을 입력하세요!"
          />
        )}
        {category === "DOING" && (
          <Input
            type="text"
            {...register("toDo")}
            placeholder="하고 있는 입력하세요!"
          />
        )}
        {category === "DONE" && (
          <Input
            type="text"
            {...register("toDo")}
            placeholder="완료한 일을 입력하세요!"
          />
        )}
      </form>
    </>
  );
}

export default Create;
