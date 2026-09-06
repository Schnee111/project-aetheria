import { describe, expect, it } from 'vitest';
import {
  EvidenceSchema,
  EvidenceRuleSchema,
  ClaimInspectionRuleSchema,
  EditorialDecisionSchema,
  EditorialOutcomeSchema,
} from './evidence.schema';

describe('EvidenceSchema and Deduction Rules', () => {
  it('validates a valid Evidence entry', () => {
    const validEvidence = {
      id: 'EV_CH01_001',
      title: 'Broken Mana Regulator',
      kind: 'document',
      source: 'Workshop Workbench',
      claim: 'The regulator was fractured by external impact.',
      credibility: 'high',
      entityTags: ['regulator', 'workshop'],
      timeTags: ['morning'],
      locationTags: ['workshop'],
      relatedEvidenceIds: [],
      contradictionWith: [],
      learningPoint: 'External force was applied before the overload.',
      unlockSceneId: 'CH01_S01',
      visual: '/assets/evidence/regulator.webp',
    };

    const parsed = EvidenceSchema.safeParse(validEvidence);
    expect(parsed.success).toBe(true);
  });

  it('rejects invalid evidence ID formats', () => {
    const invalidEvidence = {
      id: 'EV_INVALID',
      title: 'Invalid',
      kind: 'document',
      source: 'Unknown',
      claim: 'None',
      credibility: 'low',
      entityTags: ['tag'],
      timeTags: [],
      locationTags: [],
      relatedEvidenceIds: [],
      contradictionWith: [],
      learningPoint: 'None',
      unlockSceneId: 'CH01_S01',
      visual: '/assets/none.webp',
    };

    const parsed = EvidenceSchema.safeParse(invalidEvidence);
    expect(parsed.success).toBe(false);
  });

  it('validates EvidenceRuleSchema for board connections', () => {
    const rule = {
      id: 'CH01_RULE_001',
      evidenceAId: 'EV_CH01_001',
      evidenceBId: 'EV_CH01_002',
      kind: 'contradiction',
      label: 'Alibi Contradiction',
      explanation: 'The timeline does not match the timestamp on the log.',
      unlocksConfrontation: true,
      insightId: 'INSIGHT_TIMELINE_MISMATCH',
    };

    const parsed = EvidenceRuleSchema.safeParse(rule);
    expect(parsed.success).toBe(true);
  });

  it('validates ClaimInspectionRuleSchema, EditorialDecisionSchema, and EditorialOutcomeSchema', () => {
    const claimRule = {
      id: 'CIR_001',
      claimId: 'CLAIM_01',
      evidenceId: 'EV_CH01_001',
      requiredInsightIds: ['INSIGHT_TIMELINE_MISMATCH'],
      verdict: 'contradicts',
      feedback: 'The evidence clearly proves otherwise.',
    };
    expect(ClaimInspectionRuleSchema.safeParse(claimRule).success).toBe(true);

    const decision = {
      id: 'DECISION_ACCUSE',
      label: 'Confront Suspect',
      description: 'Present the contradictory evidence immediately.',
      summary: 'You choose direct confrontation.',
    };
    expect(EditorialDecisionSchema.safeParse(decision).success).toBe(true);

    const outcome = {
      tier: 'strong',
      title: 'Truth Unveiled',
      narrative: 'The suspect falters under undeniable proof.',
      reputationDelta: 15,
      rumorSpreadDelta: -10,
      reflectionBullets: ['Quick deductive reasoning', 'Preserved evidence integrity'],
    };
    expect(EditorialOutcomeSchema.safeParse(outcome).success).toBe(true);
  });
});
