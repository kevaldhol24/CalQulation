
import { SupportedCurrencies } from "@/lib/constants";

type CurrencyData = {
    label: string;
    symbol: string;
    currency: string;
    iso: string;
    flag: string;
    style: string;
    currencyDisplay: string;
    maximumFractionDigits: number;
};

export const getCurrencyCookie = (): CurrencyData | null => {
    if (typeof document === 'undefined') return null;
    const cookie = document.cookie.split('; ').find(row => row.startsWith('currency='));
    return cookie ? JSON.parse(decodeURIComponent(cookie.split('=')[1])) : null;
}

export const setCurrencyCookie = (currencyData: CurrencyData): void => {
    if (typeof document === 'undefined') return;
    document.cookie = `currency=${encodeURIComponent(JSON.stringify(currencyData))}; path=/; max-age=${60 * 60 * 24 * 3650}`; // 10 years
}

export const getCurrencySymbol = (): string => {
    const currencyData = getCurrencyCookie();
    return currencyData?.symbol ? currencyData.symbol : "₹";
}

export const getCurrentCurrency = (): CurrencyData => {
    const cookieData = getCurrencyCookie();
    if (cookieData) return cookieData;
    
    // Return default INR currency if no cookie exists
    return SupportedCurrencies[0];
}

export const currency = () => {
    const currencyData = getCurrentCurrency();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { iso: CURRENCY_ISO, symbol, ...CURRENCY_FORMAT_DECIMAL } = currencyData;

    const formateCurrency = (amount: number) => {
        return new Intl.NumberFormat(CURRENCY_ISO, CURRENCY_FORMAT_DECIMAL as never).format(
            amount
        );
    }

    return {
        formateCurrency,
    }
};