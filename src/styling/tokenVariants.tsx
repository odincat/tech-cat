import { theme } from '@stitches';
import type { CSS, config as stitchesConfig } from '@stitches';
import type * as Stitches from '@stitches/react';

// https://github.com/stitchesjs/stitches/issues/314

export const tokenVariants = <T extends keyof typeof theme>(config: {
    token: T;
    css: (value: Stitches.ScaleValue<T, typeof stitchesConfig>) => CSS;
}): Record<keyof typeof theme[T], CSS> =>
    Object.entries(theme[config.token]).reduce(
        (previousValue, [key, value]) => ({
            ...previousValue,

            [key]: config.css(value),
        }),
        {} as Record<keyof typeof theme[T], CSS>,
    );

export type TokenVariant<T extends keyof typeof theme> = keyof typeof theme[T];

export const cssVar = (variableName: string, fallback?: string) => {
  return {
    getter: `var(--${variableName}${fallback ? `, ${fallback}` : ""})`,
    setter: `--${variableName}`
  };
};

