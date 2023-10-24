import { snakeCase } from "lodash";

export function normaliseData(data: any[], idPredicate: (e: any) => string) {
  return data
    .map((entry) =>
      Object.entries(entry).reduce(
        (agg, [key, val]) => ({
          ...agg,
          [snakeCase(key)]: val,
        }),
        {},
      ),
    )
    .filter(idPredicate)
    .map((e: any) => ({ ...e, id: idPredicate(e) })) as any[];
}
