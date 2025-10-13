import { useId } from "react";

export const useFormField = (name: string) => {
  const id = useId();
  return {
    id: `${name}-${id}`,
    name,
  }
}