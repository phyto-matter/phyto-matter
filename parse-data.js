import csvToJson from "csvtojson";
import fs from "fs";
import path from "path";

const DATA_ROOT = path.join(__dirname, "../data");
const TARGET = path.join(__dirname, "src/converted.ts");
const CSV_PREFIX = ".csv";
const csvFiles = fs
  .readdirSync(DATA_ROOT)
  .filter((_) => _.endsWith(CSV_PREFIX));

async function doParse() {
  let allEntries = await Promise.all(
    csvFiles.map(async (source_file) => {
      const jsonArray = await csvToJson().fromFile(
        path.join(DATA_ROOT, source_file),
      );

      return jsonArray.map((e) => ({ ...e, source_file }));
    }, []),
  );

  fs.writeFileSync(
    TARGET,
    `export const ALL_DATA: any[] = ${JSON.stringify(
      allEntries.flat(),
      null,
      2,
    )};`,
    "utf-8",
  );
}

doParse();
