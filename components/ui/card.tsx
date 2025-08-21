import * as React from "react";
export function Card({ className = "", ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={"border bg-white " + className} {...p} />;
}
export function CardHeader({ className = "", ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={"p-6 pb-2 " + className} {...p} />;
}
export function CardTitle({ className = "", ...p }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={"text-xl font-semibold " + className} {...p} />;
}
export function CardContent({ className = "", ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={"p-6 pt-2 " + className} {...p} />;
}
