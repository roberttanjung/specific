import * as yup from "yup";

export const formSchema = yup
  .object({
    title: yup.string().required("Title is required").max(100, "Title must be under 100 characters"),
    description: yup
      .string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
    dueDate: yup
      .string()
      .required("Due date is required")
      .test("is-valid-date", "Due date must be a valid date", (value) => {
        return Boolean(value && !Number.isNaN(Date.parse(value)));
      })
      .test("not-in-past", "Due date cannot be in the past", (value) => {
        if (!value) return false;
        const selected = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selected >= today;
      }),
  })
  .required();

export type FormValues = yup.InferType<typeof formSchema>;
