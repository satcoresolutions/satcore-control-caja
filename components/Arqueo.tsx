"use client";

import { useState } from "react";
import { formatCOP } from "@/lib/format";
import { ui } from "@/lib/ui";

interface Props {
  expectedCash: number;
  onAdjust: (diff: number) => void;
}

export default function Arqueo({ expectedCash, onAdjust }: Props) {
  const [counted, setCounted] = useState<string>("");

  const hasValue = counted.trim() !== "";
  const value = Number(counted) || 0;
  const diff = value - expectedCash;

  const status = !hasValue
    ? "idle"
    : diff === 0
      ? "ok"
      : diff > 0
        ? "over"
        : "short";

  return (
    <section className={ui.panel}>
      <div className={ui.panelHead}>
        <h2 className={ui.title}>Arqueo de caja</h2>
      </div>

      <p className={ui.hint}>
        Cuenta el efectivo que realmente hay en la caja y compáralo con lo que
        dice la app.
      </p>

      <div className={ui.grid2}>
        <div className="grid gap-1 rounded-lg border border-border bg-background p-4">
          <span className="text-sm text-text-muted">
            Efectivo según la app
          </span>

          <strong className="text-xl font-bold tabular-nums text-foreground">
            {formatCOP(expectedCash)}
          </strong>

          <small className="text-xs text-text-muted">
            hasta hoy
          </small>
        </div>

        <label className={ui.label}>
          Efectivo contado ($)

          <input
            type="number"
            min={0}
            placeholder="0"
            value={counted}
            onChange={(e) => setCounted(e.target.value)}
            className={ui.input}
          />
        </label>
      </div>

      {status !== "idle" && (
        <div
          className={[
            "mt-4 grid gap-2 rounded-lg border p-4",
            status === "ok"
              ? "border-success/30 bg-success/10 text-success"
              : status === "over"
                ? "border-secondary/30 bg-secondary/10 text-secondary"
                : "border-danger/30 bg-danger/10 text-danger",
          ].join(" ")}
        >
          {status === "ok" && (
            <strong>La caja cuadra.</strong>
          )}

          {status === "over" && (
            <>
              <strong>
                Sobran {formatCOP(diff)}.
              </strong>

              <span className="text-sm">
                Hay más efectivo del que registraste.
              </span>
            </>
          )}

          {status === "short" && (
            <>
              <strong>
                Faltan {formatCOP(Math.abs(diff))}.
              </strong>

              <span className="text-sm">
                Hay menos efectivo del que registraste.
              </span>
            </>
          )}

          {status !== "ok" && (
            <button
              type="button"
              className={`${ui.btn} mt-2 justify-self-start`}
              onClick={() => {
                onAdjust(diff);
                setCounted("");
              }}
            >
              Registrar ajuste de {formatCOP(Math.abs(diff))}
            </button>
          )}
        </div>
      )}
    </section>
  );
}