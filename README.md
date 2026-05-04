# Turborepo + Checkly

   Checkly integrates with a Turborepo monorepo using pnpm workspaces.

  ### Setup
  - Turborepo with `apps/` directory + shared packages
  - pnpm workspaces with `workspace:*` dependencies
  - Turbo pipeline orchestrates `checkly test` and `checkly deploy` across all apps

  ### Shared Blocks
  - `packages/shared-helpers/` — composable functions (navigateTo, searchBook,
  addToCart, etc.)
  - Used by both CI tests and monitors

  ### CI/CD Pipeline
  - **On PR:** `checkly test --record` validates all checks on Checkly infra
  - **On merge to main:** `checkly deploy` promotes to live scheduled monitors
