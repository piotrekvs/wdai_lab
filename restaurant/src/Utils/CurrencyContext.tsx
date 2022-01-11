import React from 'react';
import { ICurrencyContext, WithCurrencyHOC } from '../Types/Types';

export const CurrencyContext = React.createContext<ICurrencyContext>(undefined as never);

export const useCurrency = () => React.useContext(CurrencyContext);

export const withCurrency: WithCurrencyHOC = (ChildComponent) => (
    (props: unknown) => (
        <CurrencyContext.Consumer>
            {(currencyContext) => (
                <ChildComponent
                    {...props as unknown}
                    currencyContext={currencyContext}
                />
            )}
        </CurrencyContext.Consumer>
    )
);
