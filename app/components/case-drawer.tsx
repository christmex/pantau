"use client";

import Image from "next/image";
import { useEffect } from "react";

import {
  classifySource,
  toHostname,
  VERIFICATION_STATUS,
} from "@/app/lib/case-presentation";
import { formatLongDate } from "@/app/lib/format-date";
import { INCIDENT_TYPE_LABELS } from "@/app/lib/incident-classification";
import type { ReligiousIntoleranceCase } from "@/app/lib/religious-intolerance-cases";

type CaseDrawerProps = {
  incident: ReligiousIntoleranceCase;
  onClose: () => void;
};

export function CaseDrawer({ incident, onClose }: CaseDrawerProps) {
  useEffect(() => {
    const closeOnEscape = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <>
      <button
        type="button"
        className="drawer-backdrop"
        aria-label="Tutup detail kasus"
        onClick={onClose}
      />

      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`drawer-title-${incident.id}`}
      >
        <div className="drawer-head">
          <span className="case-card-type">
            {INCIDENT_TYPE_LABELS[incident.incidentType]}
          </span>
          <button
            type="button"
            className="drawer-close"
            onClick={onClose}
            aria-label="Tutup"
          >
            ×
          </button>
        </div>

        <div className="drawer-body">
          <h2 id={`drawer-title-${incident.id}`}>{incident.title}</h2>

          <figure className="drawer-media-block">
            <div className="drawer-media">
              <Image
                src={incident.image.path}
                alt={`Dokumentasi: ${incident.title}`}
                fill
                sizes="(max-width: 680px) 100vw, 620px"
              />
            </div>
            <figcaption className="credit-line">
              Foto: {incident.image.sourceOutlet} ·{" "}
              <a
                href={incident.image.sourcePage}
                target="_blank"
                rel="noopener noreferrer"
              >
                halaman sumber
              </a>
            </figcaption>
          </figure>

          <div className="fact-grid">
            <div className="fact">
              <span className="field-label">Lokasi</span>
              <p>
                {incident.city}, {incident.province}
              </p>
            </div>
            <div className="fact">
              <span className="field-label">Tanggal</span>
              <p>{formatLongDate(incident.date)}</p>
            </div>
            <div className="fact">
              <span className="field-label">Status</span>
              <p>{VERIFICATION_STATUS}</p>
            </div>
          </div>

          <div className="drawer-block">
            <span className="field-label">Pelaku</span>
            <p>{incident.perpetrator}</p>
          </div>

          <div className="drawer-block">
            <span className="field-label">Korban</span>
            <p>{incident.victim}</p>
          </div>

          <div className="drawer-block">
            <span className="field-label">Kronologi</span>
            <p>{incident.chronology}</p>
          </div>

          <div className="drawer-block">
            <span className="field-label">
              Sumber · {incident.links.length} tautan
            </span>
            <ul className="source-list">
              {incident.links.map((link, linkIndex) => (
                <li key={link}>
                  <a
                    className="source-row"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="source-index">
                      {String(linkIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="source-kind">{classifySource(link)}</span>
                    <span className="source-host">{toHostname(link)}</span>
                    <span>buka →</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
