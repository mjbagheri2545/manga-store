import { NextFunction, Request, Response } from "express";

export type EmptyObject = NonNullable<unknown>;

export type TypeOrTypeArray<T> = T | T[];

export type MiddlewareParams = [Request, Response, NextFunction];
