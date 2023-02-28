import { Todo } from "@/types/Todo";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useQueryTodos = () => {
  const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
  });
  const getTodos = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
      //   `${process.env.NEXT_PUBLIC_API_URL}/todo`
    );
    return data;
  };
  return useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: getTodos,
    onError: (err: any) => {
      console.log("error");
    },
  });
};
