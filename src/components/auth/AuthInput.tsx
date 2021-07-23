interface AuthInputProps {
  label: string;
  value: any;
  type?: "text" | "email" | "password";
  shouldntRender?: boolean;
  required?: boolean;
  onChangeValue: (newValue: any) => void;
}

export default function AuthInput(props: AuthInputProps) {
  return !props.shouldntRender ? (
    <div className={`flex flex-col mt-4`}>
      <label>{props.label}</label>
      <input
        type={props.type ?? "text"}
        value={props.value}
        onChange={(e) => props.onChangeValue?.(e.target.value)}
        required={props.required}
        className={`
          px-4 py-3 rounded-lg bg-gray-200 mt-2
          border focus:border-blue-500 focus:bg-white
          focus:outline-none
        `}
      />
    </div>
  ) : null;
}
