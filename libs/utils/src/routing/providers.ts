import type { Providers } from '../http/providers';
import type { ProviderType } from '../http/providers';

const enum DataType {
  currentMonthData = 'current_month_data',
  hasData = 'has_data',
  previousMonthData = 'previous_month_data',
}

const _getOcpProvider = (ocpProviders: Providers, uuid?: string) => {
  let result;
  if (ocpProviders?.data) {
    for (const provider of ocpProviders.data) {
      if (provider?.infrastructure?.uuid === uuid) {
        result = provider;
        break;
      }
    }
  }
  return result;
};

export const filterProviders = (providers: Providers, sourceType: ProviderType) => {
  if (!providers) return providers;
  const data = providers.data.filter(provider => provider?.source_type?.toLowerCase() === sourceType);
  const meta = {
    ...providers.meta,
    count: data.length,
  };
  return {
    ...providers,
    meta,
    data,
  } as Providers;
};

const _hasData = (providers: Providers, datumType: DataType) => {
  let result = false;
  if (providers?.data) {
    for (const provider of providers.data) {
      if ((provider as any)[datumType]) {
        result = true;
        break;
      }
    }
  }
  return result;
};

const _hasCloudData = (providers: Providers, ocpProviders: Providers, dataType: DataType) => {
  let result = false;
  if (providers?.data) {
    for (const provider of providers.data) {
      const ocpProvider = _getOcpProvider(ocpProviders, (provider as any).uuid);
      if (ocpProvider && (ocpProvider as any)[dataType]) {
        result = true;
        break;
      }
    }
  }
  return result;
};

const _hasCloudProvider = (providers: Providers, ocpProviders: Providers) => {
  let result = false;
  if (providers?.data) {
    for (const provider of providers.data) {
      const ocpProvider = _getOcpProvider(ocpProviders, (provider as any).uuid);
      if (ocpProvider) {
        result = true;
        break;
      }
    }
  }
  return result;
};

export const hasCloudCurrentMonthData = (providers: Providers, ocpProviders: Providers) => {
  return _hasCloudData(providers, ocpProviders, DataType.currentMonthData);
};
export const hasCloudData = (providers: Providers, ocpProviders: Providers) => {
  return _hasCloudData(providers, ocpProviders, DataType.hasData);
};
export const hasCloudPreviousMonthData = (providers: Providers, ocpProviders: Providers) => {
  return _hasCloudData(providers, ocpProviders, DataType.previousMonthData);
};
export const hasCloudProvider = (providers: Providers, ocpProviders: Providers) => {
  return _hasCloudProvider(providers, ocpProviders);
};
export const hasCurrentMonthData = (providers: Providers) => {
  return _hasData(providers, DataType.currentMonthData);
};
export const hasData = (providers: Providers) => {
  return _hasData(providers, DataType.hasData);
};
export const hasPreviousMonthData = (providers: Providers) => {
  return _hasData(providers, DataType.previousMonthData);
};


