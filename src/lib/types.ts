import { ComponentClass, FunctionComponent, ReactNode } from 'react';

export type NextComponent<P = {}> = ComponentClass<P & { children?: ReactNode }> | FunctionComponent<P & { children?: ReactNode }>;
