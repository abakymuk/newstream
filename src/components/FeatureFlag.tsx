"use client";

import { ReactNode } from "react";
import { isFeatureEnabled, type FeatureFlag } from "@/lib/feature-flags";

interface FeatureFlagProps {
  flag: FeatureFlag;
  children: ReactNode;
  fallback?: ReactNode;
}

export function FeatureFlag({
  flag,
  children,
  fallback = null,
}: FeatureFlagProps) {
  if (!isFeatureEnabled(flag)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export function withFeatureFlag<T extends object>(
  Component: React.ComponentType<T>,
  flag: FeatureFlag,
  fallback?: ReactNode
) {
  return function FeatureFlaggedComponent(props: T) {
    return (
      <FeatureFlag flag={flag} fallback={fallback}>
        <Component {...props} />
      </FeatureFlag>
    );
  };
}
