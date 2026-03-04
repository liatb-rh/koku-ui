const ACTION_NAMES = [
  'SET_WRITE_PERMISSIONS',
  'SET_ORG_ADMIN',
  'SET_INTEGRATIONS_ENDPOINTS_PERMISSIONS',
  'SET_INTEGRATIONS_READ_PERMISSIONS',
] as const;

export const ACTION_TYPES = ACTION_NAMES.reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: curr,
    [`${curr}_PENDING`]: `${curr}_PENDING`,
    [`${curr}_FULFILLED`]: `${curr}_FULFILLED`,
    [`${curr}_REJECTED`]: `${curr}_REJECTED`,
  }),
  {} as Record<string, string>
);
