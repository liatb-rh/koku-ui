export const useUnleashClient = () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isEnabled: (feature: string) => false,
});

/** On-prem stub: feature flags disabled. Returns a function that always returns false. */
export const useFlag = (_flagName: string) => () => false;
