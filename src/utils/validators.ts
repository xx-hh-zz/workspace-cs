export const required = (message: string) => (value: unknown) =>
  value === undefined || value === null || value === '' ? message : undefined;

export const minLength = (min: number, message: string) => (value: string) =>
  !value || value.length < min ? message : undefined;

export const maxLength = (max: number, message: string) => (value: string) =>
  value && value.length > max ? message : undefined;

export const numberGreaterThan = (min: number, message: string) => (value: number) =>
  value === undefined || value === null || Number(value) <= min ? message : undefined;

export const combine = (...validators: Array<(value: unknown) => string | undefined>) =>
  (value: unknown) => {
    for (const validator of validators) {
      const result = validator(value);
      if (result) return result;
    }
    return undefined;
  };
