import { useState } from "react";
import styles from "./NewTodo.module.scss";
import { T_TODO } from "../../../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequestAddTodo } from "../../../../methods/requests";

interface IProps {
  setAddingTodo: React.Dispatch<React.SetStateAction<boolean>>;
  userID: number;
}

const NewTodo: React.FC<IProps> = (props) => {
  const [todo, setTodo] = useState<T_TODO>({ todo_id: 0, title: "", content: "" });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: apiRequestAddTodo,
    onSuccess: (data) => {
      console.log(`apiRequestAddTodo: ${data.data.valid}`);
      props.setAddingTodo(false);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  function inputHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setTodo((todo: T_TODO) => {
      return {
        ...todo,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <div className={`card m-3 ${styles.root}`}>
      <div className="card-body">
        <h3 className="card-title">
          <input
            className="form-control"
            onChange={inputHandler}
            value={todo.title}
            name="title"
            type="text"
          />
        </h3>
        <hr />
        <div className="card-text">
          <textarea
            className="form-control mb-3"
            onChange={inputHandler}
            name="content"
            value={todo.content}
          />
        </div>
        <hr />
        <div className="card-text text-center">
          <button
            className="btn btn-info me-3 text-light"
            onClick={() => {
              mutation.mutate({
                ...todo,
                user_id: props.userID
              });
            }}
          >
            Add
          </button>
          <button
            className="btn btn-danger text-light"
            onClick={() => props.setAddingTodo(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div >
  );
};

export default NewTodo;
