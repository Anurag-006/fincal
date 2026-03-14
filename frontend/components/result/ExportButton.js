"use client";
import { useState } from "react";
import Button from "../ui/Button";

export default function ExportButton({ exportData }) {
  const [loading, setLoading] = useState(false);
  const handleExport = async () => {
    setLoading(true);
    try {
      const { exportRetirementPlan } = await import("../../lib/exportExcel");
      exportRetirementPlan(exportData);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };
  return (
    <Button onClick={handleExport} disabled={loading} className="w-full">
      {loading ? "Generating…" : "Download Excel Report"}
    </Button>
  );
}
