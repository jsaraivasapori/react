import styles from "./styles.module.css";

type DefaultInputProps = {
  id: string;
} & React.ComponentProps<"input">;

export function DefaultInput({ id, type }: DefaultInputProps) {
  return (
    <>
      <label htmlFor={id}>task</label>
      <input id={id} type={type} />
    </>
  );
}
