import { BackToTop } from "@/app/components/back-to-top";
import { CaseDirectory } from "@/app/components/case-directory";
import { DistributionSection } from "@/app/components/distribution-section";
import { HeroSection } from "@/app/components/hero-section";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import {
  getCases,
  getCoveredYears,
  getDataUpdatedAt,
  getImageOutlets,
  getIncidentTypeCounts,
  getProvinceCounts,
} from "@/app/lib/religious-intolerance-cases";

export default function Home() {
  const cases = getCases();
  const coveredYears = getCoveredYears();
  const provinceCounts = getProvinceCounts();
  const incidentTypeCounts = getIncidentTypeCounts();
  const updatedAt = getDataUpdatedAt();

  return (
    <>
      <SiteHeader />
      <main className="frame">
        <HeroSection />
        <CaseDirectory
          cases={cases}
          provinces={provinceCounts.map((entry) => entry.label)}
          years={coveredYears}
          incidentTypes={incidentTypeCounts.map((entry) => entry.incidentType)}
        />
        <DistributionSection
          provinceCounts={provinceCounts}
          incidentTypeCounts={incidentTypeCounts}
          totalCases={cases.length}
        />
      </main>
      <SiteFooter
        totalCases={cases.length}
        updatedAt={updatedAt}
        imageOutlets={getImageOutlets()}
      />
      <BackToTop />
    </>
  );
}
