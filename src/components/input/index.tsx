interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export function Input(props: InputProps) {
  return (
    <input
      className="bg-amber-50 border-0 h-9 rounded-md outline-none px-2 mb-3"
      type="text" {...props}
    />
  );
}
