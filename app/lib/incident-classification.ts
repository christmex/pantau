export const IncidentType = {
  MobViolence: "mob-violence",
  WorshipPlaceSealing: "worship-place-sealing",
  WorshipDisruption: "worship-disruption",
  WorshipPlaceRejection: "worship-place-rejection",
  BlasphemyProsecution: "blasphemy-prosecution",
  MinorityDiscrimination: "minority-discrimination",
  Intimidation: "intimidation",
} as const;

export type IncidentType = (typeof IncidentType)[keyof typeof IncidentType];

export const INCIDENT_TYPE_LABELS: Record<IncidentType, string> = {
  [IncidentType.MobViolence]: "Kekerasan & perusakan",
  [IncidentType.WorshipPlaceSealing]: "Penyegelan",
  [IncidentType.WorshipDisruption]: "Pembubaran ibadah",
  [IncidentType.WorshipPlaceRejection]: "Penolakan rumah ibadah",
  [IncidentType.BlasphemyProsecution]: "Kriminalisasi penistaan",
  [IncidentType.MinorityDiscrimination]: "Diskriminasi minoritas",
  [IncidentType.Intimidation]: "Intimidasi",
};

export const INCIDENT_TYPE_ORDER: readonly IncidentType[] = [
  IncidentType.MobViolence,
  IncidentType.WorshipPlaceSealing,
  IncidentType.WorshipDisruption,
  IncidentType.WorshipPlaceRejection,
  IncidentType.BlasphemyProsecution,
  IncidentType.MinorityDiscrimination,
  IncidentType.Intimidation,
];

type ClassificationRule = {
  readonly type: IncidentType;
  readonly pattern: RegExp;
};

// Ordered by how defining the act is: a category string usually lists several
// acts, and the first rule that matches decides which one names the case.
const CLASSIFICATION_RULES: readonly ClassificationRule[] = [
  { type: IncidentType.MobViolence, pattern: /kekerasan|perusakan|bersenjata/i },
  {
    type: IncidentType.WorshipPlaceRejection,
    pattern: /penolakan|penghentian pembangunan/i,
  },
  {
    type: IncidentType.WorshipDisruption,
    pattern: /pembubaran|penghalangan|pelarangan ibadah|pembatalan/i,
  },
  {
    type: IncidentType.WorshipPlaceSealing,
    pattern: /penyegelan|penutupan|penghentian/i,
  },
  { type: IncidentType.BlasphemyProsecution, pattern: /kriminalisasi|penistaan/i },
  {
    type: IncidentType.MinorityDiscrimination,
    pattern: /diskriminasi|ahmadiyah|kebebasan akademik/i,
  },
];

export function classifyIncident(category: string): IncidentType {
  const matchedRule = CLASSIFICATION_RULES.find((rule) =>
    rule.pattern.test(category),
  );

  return matchedRule?.type ?? IncidentType.Intimidation;
}
