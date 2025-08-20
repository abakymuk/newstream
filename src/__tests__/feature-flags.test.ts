/* eslint-disable @typescript-eslint/no-require-imports */
describe('Feature Flags', () => {
  const originalEnv = process.env

  afterEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  it('should return false when feature flag is not set', () => {
    delete process.env.NEXT_PUBLIC_FEATURE_AUTH_ROLES
    const { isFeatureEnabled } = require('../lib/feature-flags')
    expect(isFeatureEnabled('AUTH_ROLES')).toBe(false)
  })

  it('should return true when feature flag is set to true', () => {
    process.env.NEXT_PUBLIC_FEATURE_AUTH_ROLES = 'true'
    delete require.cache[require.resolve('../lib/feature-flags')]
    const { isFeatureEnabled } = require('../lib/feature-flags')
    expect(isFeatureEnabled('AUTH_ROLES')).toBe(true)
  })

  it('should return false when feature flag is set to false', () => {
    process.env.NEXT_PUBLIC_FEATURE_AUTH_ROLES = 'false'
    delete require.cache[require.resolve('../lib/feature-flags')]
    const { isFeatureEnabled } = require('../lib/feature-flags')
    expect(isFeatureEnabled('AUTH_ROLES')).toBe(false)
  })

  it('should return all feature flags', () => {
    const { getFeatureFlags } = require('../lib/feature-flags')
    const flags = getFeatureFlags()
    expect(flags).toHaveProperty('AUTH_ROLES')
    expect(flags).toHaveProperty('PASSWORD_RESET')
    expect(flags).toHaveProperty('ORGANIZATION_MANAGEMENT')
    expect(flags).toHaveProperty('USER_PROFILE')
  })
})