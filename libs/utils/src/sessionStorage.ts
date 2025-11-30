const accountCurrencyID = 'account_currency';
const accountNumberID = 'account_number';
const costManagementID = 'cost_management_ros';
const currencyID = 'currency';

export const getStorage = () => {
  const s = sessionStorage.getItem(costManagementID);
  return s && s !== null ? JSON.parse(s) : undefined;
};

export const getItem = (id: string) => {
  const s = getStorage();
  return s ? s[id] : undefined;
};

export const removeItem = (id: string) => {
  const s = getStorage();
  if (s) {
    s[id] = undefined;
    sessionStorage.setItem(costManagementID, JSON.stringify(s));
  }
};

export const setItem = async (id: string, value: string) => {
  if (!value) {
    return;
  }
  let s = getStorage();
  if (!s) {
    const identity = await getUserIdentity();
    s = {
      [accountNumberID]: identity.account_number,
    };
  }
  s[id] = value;
  sessionStorage.setItem(costManagementID, JSON.stringify(s));
};

export const getAccountCurrency = () => {
  const units = getItem(accountCurrencyID);
  return units ? units : 'USD';
};

export const getCurrency = () => {
  const units = getItem(currencyID);
  return units ? units : 'USD';
};

export const isCurrencyAvailable = () => {
  const currency = getItem(currencyID);
  return currency && currency !== null;
};

export const setAccountCurrency = (value: string) => {
  setItem(accountCurrencyID, value);
};

export const setCurrency = (value: string) => {
  setItem(currencyID, value);
};

export const invalidateSession = (force = false) => {
  if (force) {
    sessionStorage.removeItem(costManagementID);
    return;
  }
  isSessionValid().then(valid => {
    if (!valid) {
      sessionStorage.removeItem(costManagementID);
    }
  });
};

const isSessionValid = async () => {
  const accountNumber = getItem(accountNumberID);
  if (!accountNumber) {
    return true;
  }
  return getUserIdentity().then(identity => {
    return accountNumber === identity.account_number;
  });
};

const getUserIdentity = async () => {
  const insights = (window as any).insights;
  const user = await insights.chrome.auth.getUser();
  return user.identity;
};


