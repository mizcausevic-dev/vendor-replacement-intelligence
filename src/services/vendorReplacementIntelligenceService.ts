import { analyze } from "../analyze.js";
import { sampleVendorReplacement } from "../data/sampleVendorReplacement.js";

const report = analyze(sampleVendorReplacement, { now: "2026-05-31T10:15:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    vendors: report.vendors,
    readyCandidates: report.readyCandidates,
    blockedCandidates: report.blockedCandidates,
    staleCases: report.staleCases,
    replacementScore: report.replacementScore,
    annualSpendUsd: report.annualSpendUsd,
    modeledSavingsUsd: report.modeledSavingsUsd,
    highFindings,
    recommendation:
      "Prioritize overlap-tax removals first, then reissue blocked replacement cases with cleaner dependency maps before promising savings to the board."
  };
}

export function replacementLane() {
  return [
    {
      lane: "AI and identity replacement lane",
      owner: "AI platform and security operations",
      status: "red",
      relatedFindings: 4,
      focus: "Stop treating agent and identity exits as easy wins while hidden approval and exception debt remains open.",
      nextAction: "Publish one dependency-clean exit packet before repeating the savings case in a board or investor memo.",
      note: "This lane is expensive and politically visible when the story outruns the migration reality."
    },
    {
      lane: "Growth and analytics replacement lane",
      owner: "Growth analytics",
      status: "yellow",
      relatedFindings: 3,
      focus: "Separate true overlap-tax wins from the replacements that still depend on messy attribution cleanup.",
      nextAction: "Lock one low-drama GTM retirement now and push the partial cases into a cleaner evidence pass.",
      note: "This lane can fund credibility if it stops overpromising."
    },
    {
      lane: "Workflow and collaboration lane",
      owner: "Platform operations",
      status: "green",
      relatedFindings: 2,
      focus: "Take the easy collaboration and workflow wins without pretending they solve the bigger platform sprawl narrative.",
      nextAction: "Use these ready exits to prove savings discipline while the harder replacements mature.",
      note: "This is the cleanest board-friendly starting point."
    },
    {
      lane: "CRM and close-process lane",
      owner: "RevOps and finance systems",
      status: "red",
      relatedFindings: 3,
      focus: "Do not book savings here until the hidden dependencies and close-process exceptions are documented honestly.",
      nextAction: "Build the dependency map first, then revisit the replacement case.",
      note: "This is where a rushed exit can damage trust instead of creating savings."
    }
  ];
}

export function switchingRisks() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return report.findingsList
    .map((finding) => ({
      ...finding,
      owner:
        finding.category === "AI_PLATFORM" || finding.category === "IDENTITY"
          ? "AI platform and security operations"
          : finding.category === "ANALYTICS" || finding.category === "MARTECH"
            ? "Growth analytics"
            : finding.category === "CRM"
              ? "RevOps"
              : "Platform operations"
    }))
    .sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function savingsNarrative() {
  return [
    {
      packetId: "VRI-11",
      lane: "Overlap-tax retirements",
      completenessScore: 72,
      status: "green",
      blocker: "Two partial GTM cases still need cleaner evidence, but the first retirements are ready.",
      owner: "Platform operations",
      decisionNote: "Use these to prove savings discipline quickly without overstating the harder exits.",
      launchWindowHours: 48
    },
    {
      packetId: "VRI-19",
      lane: "AI and identity exits",
      completenessScore: 33,
      status: "red",
      blocker: "Exception debt and approval dependencies still make the replacement story fragile.",
      owner: "AI platform and security operations",
      decisionNote: "This is a later board move unless the evidence pack gets much cleaner.",
      launchWindowHours: 96
    },
    {
      packetId: "VRI-26",
      lane: "Analytics and attribution simplification",
      completenessScore: 54,
      status: "yellow",
      blocker: "Savings are believable, but the dependency story is still too stitched.",
      owner: "Growth analytics",
      decisionNote: "Fund the proof cleanup if leadership wants to tell a cleaner margin story this quarter.",
      launchWindowHours: 72
    },
    {
      packetId: "VRI-41",
      lane: "CRM and close-process consolidation",
      completenessScore: 29,
      status: "red",
      blocker: "Hidden dependencies and manual exceptions still make the exit plan too risky.",
      owner: "RevOps and finance systems",
      decisionNote: "Do the dependency work before the board hears a hard savings number here.",
      launchWindowHours: 84
    }
  ];
}

export function boardMemo() {
  return [
    "The cleanest savings come from low-drama overlap retirements, not from the most expensive blocked exits.",
    "AI, identity, and CRM consolidation still need cleaner dependency maps before their savings stories are board-safe.",
    "The risk is not just cost. It is whether leadership overstates replaceability and then inherits operational drag.",
    "Fund evidence and migration cleanup where the savings case is largest, but take the easy retirements first."
  ];
}

export function verification() {
  return [
    "Synthetic sample data only - no production contracts, renewals, or procurement data are shipped.",
    "Savings numbers are modeled aids for board discussion, not booked finance outcomes.",
    "The replacement engine is read-only and built for executive review, diligence framing, and vendor strategy discussion.",
    "Every finding and savings narrative is reproducible from the modeled vendor-estate records included in the repo.",
    "Board-facing replacement claims stay bounded to the evidence surfaced here."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    replacementLane: replacementLane(),
    switchingRisks: switchingRisks(),
    savingsNarrative: savingsNarrative(),
    boardMemo: boardMemo(),
    verification: verification(),
    sample: sampleVendorReplacement
  };
}
