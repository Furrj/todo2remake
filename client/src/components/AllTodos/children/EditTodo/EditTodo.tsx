import { useState } from "react";
import styles from "./EditTodo.module.scss";
import { T_TODO } from "../../../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequestUpdateTodo } from "../../../../methods/requests";

interface IProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  todo: T_TODO;
  userID: number
}

const EditTodo: React.FC<IProps> = (props) => {
  const [updatedTodo, setUpdatedTodo] = useState<T_TODO>({ ...props.todo });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: apiRequestUpdateTodo,
    onSuccess: (data) => {
      console.log(`apiRequestUpdateTodo: ${data.data.valid}`);
      props.setEditMode(false);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  function inputHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setUpdatedTodo((todo: T_TODO) => {
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
            value={updatedTodo.title}
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
            value={updatedTodo.content}
          />
        </div>
        <hr />
        <div className="card-text text-center">
          <button
            className="btn btn-info me-3 text-light"
            onClick={() => mutation.mutate({ title: updatedTodo.title, content: updatedTodo.content, todo_id: props.todo.todo_id, user_id: props.userID })}
          >
            Submit
          </button>
          <button
            className="btn btn-secondary text-light"
            onClick={() => props.setEditMode(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
