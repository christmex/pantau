import casesFile from "@/data/religious-intolerance-cases.json";

import {
  classifyIncident,
  INCIDENT_TYPE_ORDER,
  type IncidentType,
} from "./incident-classification";

export type CaseImage = {
  readonly path: string;
  readonly width: number;
  readonly height: number;
  readonly sourceOutlet: string;
  readonly sourcePage: string;
  readonly licenseNote: string;
};

export type ReligiousIntoleranceCase = {
  readonly id: string;
  readonly title: string;
  readonly image: CaseImage;
  readonly chronology: string;
  readonly category: string;
  readonly province: string;
  readonly city: string;
  readonly date: string;
  readonly year: number;
  readonly perpetrator: string;
  readonly victim: string;
  readonly links: readonly string[];
  readonly incidentType: IncidentType;
};

export type RankedCount = {
  readonly label: string;
  readonly count: number;
};

export type IncidentTypeCount = {
  readonly incidentType: IncidentType;
  readonly count: number;
};

const cases: readonly ReligiousIntoleranceCase[] = casesFile.cases.map(
  (incident) => ({
    ...incident,
    year: Number(incident.date.slice(0, 4)),
    incidentType: classifyIncident(incident.category),
  }),
);

function countBy(
  selectKey: (incident: ReligiousIntoleranceCase) => string,
): RankedCount[] {
  const tally = new Map<string, number>();

  for (const incident of cases) {
    const key = selectKey(incident);
    tally.set(key, (tally.get(key) ?? 0) + 1);
  }

  return [...tally.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort(
      (first, second) =>
        second.count - first.count || first.label.localeCompare(second.label),
    );
}

export function getCases(): readonly ReligiousIntoleranceCase[] {
  return cases;
}

export function getLatestCase(): ReligiousIntoleranceCase {
  return cases[0];
}

export function getCoveredYears(): readonly number[] {
  return [...new Set(cases.map((incident) => incident.year))].sort(
    (first, second) => second - first,
  );
}

export function countCasesInYear(year: number): number {
  return cases.filter((incident) => incident.year === year).length;
}

export function getProvinceCounts(): readonly RankedCount[] {
  return countBy((incident) => incident.province);
}

export function getIncidentTypeCounts(): readonly IncidentTypeCount[] {
  const tally = countBy((incident) => incident.incidentType);

  return INCIDENT_TYPE_ORDER.map((incidentType) => ({
    incidentType,
    count: tally.find((entry) => entry.label === incidentType)?.count ?? 0,
  }))
    .filter((entry) => entry.count > 0)
    .sort((first, second) => second.count - first.count);
}

export function countSourceLinks(): number {
  return cases.reduce((total, incident) => total + incident.links.length, 0);
}

export function getDataUpdatedAt(): string {
  return casesFile.meta.updatedAt;
}

export function getImageOutlets(): readonly string[] {
  return [...new Set(cases.map((incident) => incident.image.sourceOutlet))].sort(
    (first, second) => first.localeCompare(second),
  );
}
