import { ComponentClass, FunctionComponent } from 'react';

export type NextComponent<P = {}> = ComponentClass<P> | FunctionComponent<P>;
