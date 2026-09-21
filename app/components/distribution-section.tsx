import { BarList } from "@/app/components/bar-list";
import { SectionLabel } from "@/app/components/section-label";
import {
  INCIDENT_TYPE_LABELS,
  type IncidentType,
} from "@/app/lib/incident-classification";
import type { RankedCount } from "@/app/lib/religious-intolerance-cases";

type DistributionSectionProps = {
  provinceCounts: readonly RankedCount[];
  incidentTypeCounts: readonly { incidentType: IncidentType; count: number }[];
  totalCases: number;
};

export function DistributionSection({
  provinceCounts,
  incidentTypeCounts,
  totalCases,
}: DistributionSectionProps) {
  const incidentTypeRows = incidentTypeCounts.map((entry) => ({
    label: INCIDENT_TYPE_LABELS[entry.incidentType],
    count: entry.count,
  }));

  return (
    <section className="section" id="sebaran">
      <SectionLabel label="Sebaran" />

      <div className="section-title-row">
        <h2 className="section-title">Di mana, dan dalam bentuk apa.</h2>
        <span className="section-note">
          {totalCases} kasus · {provinceCounts.length} provinsi
        </span>
      </div>

      <div className="distribution">
        <BarList heading="Per provinsi" rows={provinceCounts} />
        <BarList
          heading="Per bentuk perbuatan"
          rows={incidentTypeRows}
          variant="soft"
        />
      </div>
    </section>
  );
}
