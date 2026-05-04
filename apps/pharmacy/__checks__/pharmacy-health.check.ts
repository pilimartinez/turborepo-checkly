import * as path from 'path'
import { BrowserCheck, Frequency, RetryStrategyBuilder } from 'checkly/constructs'

/**
 * Pattern 2: Standalone monitor.
 *
 * This is NOT a promoted CI test — it's a purpose-built production monitor.
 * It runs as an isolated browser check with its own script.
 */
new BrowserCheck('pharmacy-health-check', {
  name: 'Pharmacy - Homepage Health',
  frequency: Frequency.EVERY_5M,
  locations: ['us-east-1', 'us-west-1', 'eu-west-1'],
  tags: ['pharmacy', 'p0', 'standalone'],
  activated: true,
  retryStrategy: RetryStrategyBuilder.fixedStrategy({
    maxRetries: 1,
    baseBackoffSeconds: 0,
    maxDurationSeconds: 600,
    sameRegion: false,
  }),
  code: {
    entrypoint: path.join(__dirname, 'pharmacy-health.spec.ts'),
  },
})
