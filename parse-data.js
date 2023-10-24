import csvToJson from "csvtojson";
import fs from "fs";
import path from "path";

const PHYTO_DATA_ROOT = path.join(__dirname, "./data/phyto");
const PHYTO_TARGET = path.join(__dirname, "src/converted-phyto.ts");
const MATTER_DATA_ROOT = path.join(__dirname, "./data/matter");
const MATTER_TARGET = path.join(__dirname, "src/converted-matter.ts");
const CSV_PREFIX = ".csv";

async function doParsePhyto() {
  const csvFiles = fs
    .readdirSync(PHYTO_DATA_ROOT)
    .filter((_) => _.endsWith(CSV_PREFIX));
  let allEntries = await Promise.all(
    csvFiles.map(async (source_file) => {
      const jsonArray = await csvToJson().fromFile(
        path.join(PHYTO_DATA_ROOT, source_file),
      );

      return jsonArray.map((e) => ({ ...e, source_file }));
    }, []),
  );

  fs.writeFileSync(
    PHYTO_TARGET,
    `export const PHYTO_DATA: any[] = ${JSON.stringify(
      allEntries.flat(),
      null,
      2,
    )};`,
    "utf-8",
  );
}

async function doParseMatter() {
  const csvFiles = fs
    .readdirSync(MATTER_DATA_ROOT)
    .filter((_) => _.endsWith(CSV_PREFIX));
  let allEntries = await Promise.all(
    csvFiles.map(async (source_file) => {
      const jsonArray = await csvToJson().fromFile(
        path.join(MATTER_DATA_ROOT, source_file),
      );

      return jsonArray.map((e) => ({ ...e, source_file }));
    }, []),
  );

  fs.writeFileSync(
    MATTER_TARGET,
    `export const MATTER_DATA: any[] = ${JSON.stringify(
      allEntries.flat(),
      null,
      2,
    )};`,
    "utf-8",
  );
}

doParsePhyto();
doParseMatter();
