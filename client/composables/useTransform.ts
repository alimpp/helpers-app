interface FormField {
  key: string;
  validate: boolean;
  model: string;
  rules: string;
  minlength?: number;
  maxlength?: number;
  label: string;
  placeholder: string;
}

interface TransformedData {
  [key: string]: string;
}

export function transformToKeyModel(dataArray: FormField[]): TransformedData {
  const result: TransformedData = {};
  
  dataArray.forEach((item: FormField) => {
    if (item.key && item.model !== undefined) {
      result[item.key] = item.model;
    }
  });
  
  return result;
}

export function transformToKeyModelGeneric<T extends { key: string; model: any }>(
  dataArray: T[]
): Record<string, T['model']> {
  const result: Record<string, T['model']> = {};
  
  dataArray.forEach((item: T) => {
    if (item.key && item.model !== undefined) {
      result[item.key] = item.model;
    }
  });
  
  return result;
}

