import { defineConfig } from 'checkly'
import { AlertEscalationBuilder, Frequency } from 'checkly/constructs'
import { emailAlert } from './__checks__/alertChannels'

/**
 * Pharmacy app Checkly configuration.
 *
 * Demonstrates two patterns:
 * 1. Playwright Check Suites — CI tests promoted to monitors via @tags
 * 2. Standalone BrowserChecks
 */
export default defineConfig({
  projectName: 'Turborepo Pharmacy Monitoring',
  logicalId: 'turborepo-pharmacy',
  repoUrl: 'https://github.com/checkly/turborepo-demo',
  checks: {
    activated: true,
    muted: false,
    tags: ['pharmacy'],
    alertChannels: [emailAlert],
    frequency: Frequency.EVERY_10M,
    locations: ['us-east-1', 'us-west-1'],

    // Standalone check constructs
    checkMatch: '**/__checks__/**/*.check.ts',

    // Playwright Check Suites — promoted CI tests grouped by criticality
    playwrightConfigPath: './playwright.config.ts',
    playwrightChecks: [
      // -------------------------------------------------------
      // P0 — Critical flows: runs every 5 min, pages on-call
      // These are existing CI tests tagged @p0 that get promoted
      // to production monitors on `npx checkly deploy`
      // -------------------------------------------------------
      {
        name: 'Pharmacy - P0 Critical Flows',
        logicalId: 'pharmacy-p0-critical',
        pwTags: ['@p0'],
        frequency: Frequency.EVERY_5M,
        locations: ['us-east-1', 'us-west-1', 'eu-west-1'],
        tags: ['pharmacy', 'p0', 'critical'],
        alertEscalationPolicy: AlertEscalationBuilder.runBasedEscalation(2),
        activated: true,
      },

      // -------------------------------------------------------
      // P1 — Important flows: runs every 30 min, Slack only
      // -------------------------------------------------------
      {
        name: 'Pharmacy - P1 Important Flows',
        logicalId: 'pharmacy-p1-important',
        pwTags: ['@p1'],
        frequency: Frequency.EVERY_30M,
        locations: ['us-east-1', 'us-west-1'],
        tags: ['pharmacy', 'p1'],
        activated: true,
      },
    ],
  },
  cli: {
    runLocation: 'us-east-1',
  },
})
