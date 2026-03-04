const BASE_PATH = typeof process !== 'undefined' && process.env?.BASE_PATH ? process.env.BASE_PATH : '/api';

export const SOURCES_API_BASE_V3 = `${BASE_PATH}/sources/v3.1`;
export const COST_API_BASE_V3 = `${BASE_PATH}/cost-management/v1`;
export const INTEGRATIONS_API_BASE = `${BASE_PATH}/integrations/v1.0`;

export const USE_MOCK_API =
  typeof process !== 'undefined' && process.env?.USE_MOCK_API !== undefined
    ? process.env.USE_MOCK_API === 'true' || process.env.USE_MOCK_API === '1'
    : true;
