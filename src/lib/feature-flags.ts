// Feature flags configuration
export const FEATURE_FLAGS = {
  AUTH_ROLES: process.env.NEXT_PUBLIC_FEATURE_AUTH_ROLES === 'true',
  PASSWORD_RESET: process.env.NEXT_PUBLIC_FEATURE_PASSWORD_RESET === 'true',
  ORGANIZATION_MANAGEMENT: process.env.NEXT_PUBLIC_FEATURE_ORGANIZATION_MANAGEMENT === 'true',
  USER_PROFILE: process.env.NEXT_PUBLIC_FEATURE_USER_PROFILE === 'true',
} as const

export type FeatureFlag = keyof typeof FEATURE_FLAGS

export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return FEATURE_FLAGS[flag]
}

export function getFeatureFlags() {
  return FEATURE_FLAGS
}
