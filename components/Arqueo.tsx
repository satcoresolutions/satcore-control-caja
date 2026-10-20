"use client";

import { useState } from "react";
import { formatCOP } from "@/lib/format";

interface Props {
  expectedCash: number;
  onAdjust: (diff: number) => void;
}

export default function Arqueo({ expectedCash, onAdjust }: Props) {
  const [counted, setCounted] = useState<string>("");

  const hasValue = counted.trim() !== "";
  const value = Number(counted) || 0;
  const diff = value - expectedCash;
  const status = !hasValue ? "idle" : diff === 0 ? "ok" : diff > 0 ? "over" : "short";

  return (
    <section className="panel arqueo">
      <h2>Arqueo de caja</h2>
      <p className="hint" style={{ marginTop: 0 }}>
        Cuenta el efectivo que realmente hay en la caja y compáralo con lo que dice la app.
      </p>

      <div className="grid grid-2">
        <div className="kpi">
          <span>Efectivo según la app</span>
          <strong>{formatCOP(expectedCash)}</strong>
          <small>hasta hoy</small>
        </div>
        <label>
          Efectivo contado ($)
          <input
            type="number"
            min={0}
            placeholder="0"
            value={counted}
            onChange={(e) => setCounted(e.target.value)}
          />
        </label>
      </div>

      {status !== "idle" ? (
        <div className={`arqueo-result ${status}`}>
          {status === "ok" && <strong>La caja cuadra.</strong>}
          {status === "over" && (
            <>
              <strong>Sobran {formatCOP(diff)}.</strong>
              <span>Hay más efectivo del que registraste.</span>
            </>
          )}
          {status === "short" && (
            <>
              <strong>Faltan {formatCOP(Math.abs(diff))}.</strong>
              <span>Hay menos efectivo del que registraste.</span>
            </>
          )}
          {status !== "ok" ? (
            <button
              type="button"
              className="btn"
              onClick={() => {
                onAdjust(diff);
                setCounted("");
              }}
            >
              Registrar ajuste de {formatCOP(Math.abs(diff))}
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
