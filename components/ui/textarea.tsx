import * as React from "react";
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={"w-full rounded-2xl border px-3 py-2 text-sm outline-none focus:ring " + (props.className || "")}
    />
  );
}
export default Textarea;
