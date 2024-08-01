import styles from "./Todo.module.scss";
import { useState } from "react";
import type { T_TODO } from "../../../../types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequestDeleteTodo } from "../../../../methods/requests";
import EditTodo from "../EditTodo/EditTodo";

interface IProps {
  todo: T_TODO;
  userID: number;
}

const Todo: React.FC<IProps> = (props) => {
  const [editMode, setEditMode] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: apiRequestDeleteTodo,
    onSuccess: (data) => {
      console.log(`apiRequestDeleteTodo: ${data.data.valid}`);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <>
      {editMode ? (
        <EditTodo setEditMode={setEditMode} todo={props.todo} userID={props.userID} />
      ) : (
        <div className={`card m-3 ${styles.root}`}>
          <div className="card-body text-center">
            <h3 className="card-title">{props.todo.title}</h3>
            <hr />
            <div className="card-text">{props.todo.content}</div>
            <hr />
            <div className="card-text">
              <button
                className="btn btn-info me-3 text-light"
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
              <button
                className="btn btn-secondary text-light"
                onClick={() => mutation.mutate({ user_id: props.userID, todo_id: props.todo.todo_id })}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
