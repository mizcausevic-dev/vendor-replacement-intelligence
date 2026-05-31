import type { Finding, VendorEstateRecord, VendorReplacementExport, VendorReplacementReport } from "./types.js";

function finding(
  record: VendorEstateRecord,
  code: Finding["code"],
  severity: Finding["severity"],
  message: string
): Finding {
  return {
    code,
    severity,
    message,
    category: record.category,
    vendor: record.vendor,
    systemName: record.systemName
  };
}

function evaluateRecord(record: VendorEstateRecord): Finding[] {
  const findings: Finding[] = [];
  const state = record.observedState.toLowerCase();

  if (record.replacementStatus === "BLOCKED") {
    findings.push(finding(record, "migration-blocker", "high", "Replacement is blocked enough that the current savings narrative cannot be treated as board-ready."));  
  }

  if (record.evidenceState !== "CURRENT") {
    findings.push(finding(record, "exit-readiness-gap", record.evidenceState === "MISSING" ? "high" : "medium", "Replacement readiness still depends on stale or missing evidence packets."));
  }

  if (record.renewalDays <= 120) {
    findings.push(finding(record, "renewal-cliff", record.renewalDays <= 60 ? "high" : "medium", "A renewal cliff is approaching faster than the current replacement plan can safely absorb."));
  }

  if (record.dependencyCount >= 14 || state.includes("hidden")) {
    findings.push(finding(record, "hidden-dependency", "medium", "Hidden dependencies still make the replacement story look cleaner on slides than in practice."));
  }

  if (record.modeledSavingsUsd >= record.annualSpendUsd * 0.4 && record.replacementStatus !== "READY") {
    findings.push(finding(record, "savings-claim-unproven", "high", "The modeled savings case is ahead of the actual replacement readiness and should not harden into board language yet."));
  }

  if (state.includes("duplicate") || state.includes("overlap")) {
    findings.push(finding(record, "overlap-tax", "medium", "Tool overlap is burning budget now, even if the organization is not yet ready to exit cleanly."));
  }

  if (state.includes("heroic") || state.includes("manual") || state.includes("exception")) {
    findings.push(finding(record, "board-story-risk", "medium", "The current replacement narrative still depends on manual exceptions or heroic migration assumptions."));
  }

  return findings;
}

export function analyze(
  records: VendorEstateRecord[],
  options: { now?: string; staleAfterDays?: number } = {}
): VendorReplacementReport {
  const generatedAt = options.now ?? new Date().toISOString();
  const staleAfterDays = options.staleAfterDays ?? 30;
  const nowMs = new Date(generatedAt).getTime();

  const findingsList = records.flatMap(evaluateRecord);
  const readyCandidates = records.filter((record) => record.replacementStatus === "READY").length;
  const blockedCandidates = records.filter((record) => record.replacementStatus === "BLOCKED").length;
  const staleCases = records.filter((record) => {
    const ageDays = (nowMs - new Date(record.renewalDays ? generatedAt : generatedAt).getTime()) / (1000 * 60 * 60 * 24);
    return record.evidenceState !== "CURRENT" || ageDays > staleAfterDays;
  }).length;

  const annualSpendUsd = records.reduce((sum, record) => sum + record.annualSpendUsd, 0);
  const modeledSavingsUsd = records.reduce((sum, record) => sum + record.modeledSavingsUsd, 0);
  const highFindings = findingsList.filter((finding) => finding.severity === "high").length;
  const mediumFindings = findingsList.filter((finding) => finding.severity === "medium").length;

  const penalty = blockedCandidates * 10 + staleCases * 4 + highFindings * 5 + mediumFindings * 2;
  const replacementScore = Math.max(10, 100 - penalty);

  return {
    generatedAt,
    vendors: records.length,
    readyCandidates,
    blockedCandidates,
    staleCases,
    replacementScore,
    annualSpendUsd,
    modeledSavingsUsd,
    findingsList,
    ok: blockedCandidates === 0 && staleCases <= 1
  };
}

export function toExport(records: VendorEstateRecord[], now?: string): VendorReplacementExport {
  return {
    generatedAt: now ?? new Date().toISOString(),
    records
  };
}
