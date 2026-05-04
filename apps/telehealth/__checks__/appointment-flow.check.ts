import * as path from 'path'
import { BrowserCheck, Frequency, RetryStrategyBuilder } from 'checkly/constructs'

/**
 * Pattern 2: Standalone monitor.
 *
 * Purpose-built production monitor for the telehealth booking flow.
 * Runs independently from CI tests with its own focused script.
 */
new BrowserCheck('telehealth-appointment-flow', {
  name: 'Telehealth - Appointment Flow Health',
  frequency: Frequency.EVERY_5M,
  locations: ['us-east-1', 'us-west-1'],
  tags: ['telehealth', 'p0', 'standalone'],
  activated: true,
  retryStrategy: RetryStrategyBuilder.fixedStrategy({
    maxRetries: 1,
    baseBackoffSeconds: 0,
    maxDurationSeconds: 600,
    sameRegion: false,
  }),
  code: {
    entrypoint: path.join(__dirname, 'appointment-flow.spec.ts'),
  },
})
