import { Input } from "../ui/input";

export interface TextFieldProps extends React.ComponentProps<"input"> {
  label: string;
  wrapperClassName?: string;
  labelClassName?: string;
  endAdornment?: React.ReactNode;
  className?: string;
  adornmentClassName?: string;
}

export const TextField = ({
  label,
  wrapperClassName,
  labelClassName,
  endAdornment,
  adornmentClassName,
  ...props
}: TextFieldProps) => {
  return (
    <div className={`relative ${wrapperClassName}`}>
      <label htmlFor={props.id} className={`text-sm ${labelClassName}`}>
        {label}
        {props.required && <span className="text-destructive ms-1">*</span>}
      </label>
      <Input {...props} className={"truncate " + props.className} />
      {endAdornment && (
        <div className={`text-muted-foreground text-md absolute top-[30px] right-1 px-3 border-l border-border ${adornmentClassName || ""}`}>
          {endAdornment}
        </div>
      )}
    </div>
  );
};
