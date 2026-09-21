"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { CaseDrawer } from "@/app/components/case-drawer";
import { SectionLabel } from "@/app/components/section-label";
import { buildExcerpt, shortenParty } from "@/app/lib/case-presentation";
import { formatCompactDate } from "@/app/lib/format-date";
import {
  INCIDENT_TYPE_LABELS,
  type IncidentType,
} from "@/app/lib/incident-classification";
import type { ReligiousIntoleranceCase } from "@/app/lib/religious-intolerance-cases";

type CaseDirectoryProps = {
  cases: readonly ReligiousIntoleranceCase[];
  provinces: readonly string[];
  years: readonly number[];
  incidentTypes: readonly IncidentType[];
};

const ANY = "any" as const;
const PAGE_SIZE = 9;

const SortOrder = {
  Newest: "newest",
  Oldest: "oldest",
} as const;

type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

const SORT_LABELS: Record<SortOrder, string> = {
  [SortOrder.Newest]: "Terbaru",
  [SortOrder.Oldest]: "Terlama",
};

function matchesSearch(incident: ReligiousIntoleranceCase, query: string) {
  if (query === "") {
    return true;
  }

  return [
    incident.title,
    incident.chronology,
    incident.category,
    incident.province,
    incident.city,
    incident.perpetrator,
    incident.victim,
  ]
    .join(" ")
    .toLowerCase()
    .includes(query);
}

export function CaseDirectory({
  cases,
  provinces,
  years,
  incidentTypes,
}: CaseDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string>(ANY);
  const [selectedYear, setSelectedYear] = useState<string>(ANY);
  const [selectedIncidentType, setSelectedIncidentType] = useState<string>(ANY);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Newest);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [openedCaseId, setOpenedCaseId] = useState<string | null>(null);

  const matchingCases = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filtered = cases.filter((incident) => {
      if (selectedProvince !== ANY && incident.province !== selectedProvince) {
        return false;
      }

      if (selectedYear !== ANY && String(incident.year) !== selectedYear) {
        return false;
      }

      if (
        selectedIncidentType !== ANY &&
        incident.incidentType !== selectedIncidentType
      ) {
        return false;
      }

      return matchesSearch(incident, normalizedQuery);
    });

    return sortOrder === SortOrder.Newest
      ? filtered
      : [...filtered].reverse();
  }, [
    cases,
    searchQuery,
    selectedProvince,
    selectedYear,
    selectedIncidentType,
    sortOrder,
  ]);

  const visibleCases = matchingCases.slice(0, visibleCount);
  const remainingCount = matchingCases.length - visibleCases.length;
  const openedCase = cases.find((incident) => incident.id === openedCaseId);

  const applyFilter = (applyChange: () => void) => {
    applyChange();
    setVisibleCount(PAGE_SIZE);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedProvince(ANY);
    setSelectedYear(ANY);
    setSelectedIncidentType(ANY);
    setSortOrder(SortOrder.Newest);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section className="section" id="daftar-kasus">
      <SectionLabel label="Daftar kasus" />

      <h2 className="section-title">Cari, filter, periksa sumbernya.</h2>

      <div className="filter-bar">
        <div className="search-field">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="m10.5 10.5 3 3" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={(changeEvent) =>
              applyFilter(() => setSearchQuery(changeEvent.target.value))
            }
            placeholder="Cari kasus, kota, pelaku, atau kata kunci…"
            aria-label="Cari kasus"
          />
        </div>

        <div className="select-field">
          <select
            value={selectedProvince}
            onChange={(changeEvent) =>
              applyFilter(() => setSelectedProvince(changeEvent.target.value))
            }
            aria-label="Filter provinsi"
          >
            <option value={ANY}>Semua provinsi</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>

        <div className="select-field">
          <select
            value={selectedYear}
            onChange={(changeEvent) =>
              applyFilter(() => setSelectedYear(changeEvent.target.value))
            }
            aria-label="Filter tahun"
          >
            <option value={ANY}>Semua tahun</option>
            {years.map((year) => (
              <option key={year} value={String(year)}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="select-field">
          <select
            value={sortOrder}
            onChange={(changeEvent) =>
              applyFilter(() => setSortOrder(changeEvent.target.value as SortOrder))
            }
            aria-label="Urutkan"
          >
            {Object.values(SortOrder).map((order) => (
              <option key={order} value={order}>
                {SORT_LABELS[order]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="chip-row">
        <button
          type="button"
          className="chip"
          aria-pressed={selectedIncidentType === ANY}
          onClick={() => applyFilter(() => setSelectedIncidentType(ANY))}
        >
          Semua
        </button>
        {incidentTypes.map((incidentType) => (
          <button
            key={incidentType}
            type="button"
            className="chip"
            aria-pressed={selectedIncidentType === incidentType}
            onClick={() =>
              applyFilter(() => setSelectedIncidentType(incidentType))
            }
          >
            {INCIDENT_TYPE_LABELS[incidentType]}
          </button>
        ))}
      </div>

      {matchingCases.length === 0 ? (
        <p className="empty-state">
          Tidak ada kasus yang cocok dengan filter ini.
        </p>
      ) : (
        <ul className="case-grid">
          {visibleCases.map((incident) => (
            <li key={incident.id}>
              <article className="case-card">
                <button
                  type="button"
                  className="case-card-overlay"
                  onClick={() => setOpenedCaseId(incident.id)}
                >
                  <span className="screen-reader-only">
                    Buka detail: {incident.title}
                  </span>
                </button>

                <div className="case-media">
                  <Image
                    src={incident.image.path}
                    alt={`Dokumentasi: ${incident.title}`}
                    fill
                    sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 340px"
                  />
                  <span className="media-credit">
                    Foto: {incident.image.sourceOutlet}
                  </span>
                </div>

                <div className="case-card-body">
                  <div className="case-card-meta">
                    <span className="case-card-type">
                      {INCIDENT_TYPE_LABELS[incident.incidentType]}
                    </span>
                    <span className="case-card-date">
                      {formatCompactDate(incident.date)}
                    </span>
                  </div>

                  <h3>{incident.title}</h3>

                  <p className="case-card-place">
                    {incident.city}, {incident.province}
                  </p>
                  <p className="case-card-excerpt">
                    {buildExcerpt(incident.chronology)}
                  </p>

                  <div className="case-card-parties">
                    <span className="party-line">
                      <b>Pelaku ·</b> {shortenParty(incident.perpetrator)}
                    </span>
                    <span className="party-line">
                      <b>Korban ·</b> {shortenParty(incident.victim)}
                    </span>
                  </div>

                  <span className="case-card-sources">
                    {incident.links.length} tautan sumber →
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      {matchingCases.length > 0 && (
        <div className="grid-actions">
          {remainingCount > 0 && (
            <button
              type="button"
              className="button button-secondary"
              onClick={() => setVisibleCount(visibleCount + PAGE_SIZE)}
            >
              Muat {Math.min(remainingCount, PAGE_SIZE)} kasus lagi
            </button>
          )}
          <button type="button" className="button button-ghost" onClick={resetFilters}>
            Reset filter
          </button>
        </div>
      )}

      {openedCase && (
        <CaseDrawer
          incident={openedCase}
          onClose={() => setOpenedCaseId(null)}
        />
      )}
    </section>
  );
}
