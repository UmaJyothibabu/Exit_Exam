import * as Yup from "yup";

export const AddSchema = Yup.object({
  todo_details: Yup.string().required("Please enter a task"),
  status: Yup.string().required("Select a status"),
});
