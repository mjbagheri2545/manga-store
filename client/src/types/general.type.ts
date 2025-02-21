import React, { ComponentProps, SetStateAction } from "react";

import { LucideIcon, LucideProps } from "lucide-react";

export type TypeOrTypeArray<Type> = Type | Type[];

export type EmptyObject = NonNullable<unknown>;

export type State<T> = [T, React.Dispatch<SetStateAction<T>>];

export type Prettify<T> = {
  [Key in keyof T]: T[Key];
};

export type StrictOmit<T, K extends keyof T> = Omit<T, K>;

export type PromiseFunction<T = unknown, P = void> = (
  ...args: [params: P]
) => Promise<T>;

export type IsRequiredParam<P = void> = void extends P
  ? false
  : undefined extends P
    ? false
    : [undefined] extends P
      ? false
      : true;

export type PropsWithIcon = { Icon: LucideIcon; iconProps?: LucideProps };

export type PropsWithOptionalIcon = EmptyObject | PropsWithIcon;

export type PropsWithContainer<
  P extends keyof React.JSX.IntrinsicElements = "div",
  ChildrenNeed extends boolean = true,
> = {
  containerProps?: P extends keyof React.JSX.IntrinsicElements
    ? ChildrenNeed extends true
      ? ComponentProps<P>
      : Omit<ComponentProps<P>, "children">
    : P;
};
