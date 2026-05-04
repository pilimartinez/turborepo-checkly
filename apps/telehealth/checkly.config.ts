import { defineConfig } from 'checkly'
import { AlertEscalationBuilder, Frequency } from 'checkly/constructs'
import { emailAlert } from './__checks__/alertChannels'

export default defineConfig({
  projectName: 'Turborepo Telehealth Monitoring',
  logicalId: 'turborepo-telehealth',
  repoUrl: 'https://github.com/checkly/turborepo-demo',
  checks: {
    activated: true,
    muted: false,
    tags: ['telehealth'],
    alertChannels: [emailAlert],
    frequency: Frequency.EVERY_10M,
    locations: ['us-east-1', 'us-west-1'],

    checkMatch: '**/__checks__/**/*.check.ts',

    playwrightConfigPath: './playwright.config.ts',
    playwrightChecks: [
      {
        name: 'Telehealth - P0 Critical Flows',
        logicalId: 'telehealth-p0-critical',
        pwTags: ['@p0'],
        frequency: Frequency.EVERY_5M,
        locations: ['us-east-1', 'us-west-1', 'eu-west-1'],
        tags: ['telehealth', 'p0', 'critical'],
        alertEscalationPolicy: AlertEscalationBuilder.runBasedEscalation(2),
        activated: true,
      },
      {
        name: 'Telehealth - P1 Important Flows',
        logicalId: 'telehealth-p1-important',
        pwTags: ['@p1'],
        frequency: Frequency.EVERY_30M,
        locations: ['us-east-1', 'us-west-1'],
        tags: ['telehealth', 'p1'],
        activated: true,
      },
    ],
  },
  cli: {
    runLocation: 'us-east-1',
  },
})
