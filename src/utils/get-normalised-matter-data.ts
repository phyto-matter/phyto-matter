import { normaliseData } from "./normalise-data";
import { MATTER_DATA } from "../converted-matter";
import { groupBy, uniqBy } from "lodash";

export type ProjectEntry = {
  title: string;
  author: string;
  about: string;
  link: string;
  image?: string;
  comment?: string;
};

export type MatterEntry = {
  id: string;
  plant_species?: string;
  plant_genus: string;
  name: string;
  processing: string[];
  function: string[];
  type: string[];
  projects: ProjectEntry[];
};

export const NORMALISED_MATTER_DATA = getNormalisedMatterData();

function getNormalisedMatterData(): MatterEntry[] {
  const normalised = normaliseData(
    MATTER_DATA,
    (e) => `${e.plant_genus}-${e.type}`,
  );
  const grouped = groupBy(normalised, "id");

  return Object.values(grouped).map(
    ([first, ...rest]): MatterEntry => ({
      id: first.id,
      plant_species: first.plant_species,
      plant_genus: first.plant_genus,
      name: first.material_name,
      processing: (first.processing || "none")
        .toLowerCase()
        .split(",")
        .map((_: string) => _.trim()),
      function: (first.function || "none")
        .toLowerCase()
        .split(",")
        .map((_: string) => _.trim()),
      type: (first.type || "none")
        .toLowerCase()
        .split(",")
        .map((_: string) => _.trim()),
      projects: mapProjects([first, ...rest]),
    }),
  );
}

function mapProjects(entries: any[]): ProjectEntry[] {
  const mapped = entries.map(
    (e): ProjectEntry => ({
      title: e.project_title,
      author: e.project_author,
      link: e.project_link,
      about: e.about_project,
      image: e.material_image,
      comment: e.comment,
    }),
  );

  return uniqBy(mapped, "link");
}
