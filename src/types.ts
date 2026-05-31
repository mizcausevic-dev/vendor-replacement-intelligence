export type ReplacementCategory =
  | "AI_PLATFORM"
  | "IDENTITY"
  | "CRM"
  | "ANALYTICS"
  | "MARTECH"
  | "OBSERVABILITY"
  | "COLLABORATION"
  | "SUPPORT";

export type EvidenceState = "CURRENT" | "STALE" | "MISSING";
export type ReplacementStatus = "READY" | "PARTIAL" | "BLOCKED";
export type MigrationRisk = "LOW" | "MEDIUM" | "HIGH";

export interface VendorEstateRecord {
  id: string;
  vendor: string;
  systemName: string;
  category: ReplacementCategory;
  owner: string;
  claim: string;
  observedState: string;
  evidenceState: EvidenceState;
  replacementStatus: ReplacementStatus;
  migrationRisk: MigrationRisk;
  annualSpendUsd: number;
  modeledSavingsUsd: number;
  renewalDays: number;
  dependencyCount: number;
  boardPriority: "NOW" | "NEXT" | "WATCH";
  notes: string[];
}

export interface VendorReplacementExport {
  generatedAt: string;
  records: VendorEstateRecord[];
}

export type FindingCode =
  | "overlap-tax"
  | "renewal-cliff"
  | "migration-blocker"
  | "hidden-dependency"
  | "savings-claim-unproven"
  | "exit-readiness-gap"
  | "board-story-risk";

export interface Finding {
  code: FindingCode;
  severity: "high" | "medium" | "low" | "info";
  message: string;
  category: ReplacementCategory;
  vendor: string;
  systemName: string;
}

export interface VendorReplacementReport {
  generatedAt: string;
  vendors: number;
  readyCandidates: number;
  blockedCandidates: number;
  staleCases: number;
  replacementScore: number;
  annualSpendUsd: number;
  modeledSavingsUsd: number;
  findingsList: Finding[];
  ok: boolean;
}
