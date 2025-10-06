import React from "react";

/**
 * CheckboxGroup (genérico)
 * Props:
 * - title?: string
 * - options: Array<{ label: string, value: string }>
 * - values: Set<string> | string[]
 * - onToggle(value)
 * - direction?: "row" | "column"
 */
export default function CheckboxGroup({
  title,
  options = [],
  values = new Set(),
  onToggle,
  direction = "row",
}) {
  const has = (v) => (values instanceof Set ? values.has(v) : values.includes?.(v));

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {title && <strong style={{ marginBottom: 4 }}>{title}</strong>}
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          flexDirection: direction === "column" ? "column" : "row",
        }}
      >
        {options.map((opt) => (
          <label key={opt.value} style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={has(opt.value)}
              onChange={() => onToggle?.(opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}
