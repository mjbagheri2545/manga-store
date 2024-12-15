import React, { SetStateAction } from "react";

export type TypeOrTypeArray<Type> = Type | Type[];

export type EmptyObject = NonNullable<unknown>;

export type State<T> = [T, React.Dispatch<SetStateAction<T>>];
