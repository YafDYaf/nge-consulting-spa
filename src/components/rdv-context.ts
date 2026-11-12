import { createContext, useContext } from 'react';

export type RdvApi = { openRdv: () => void };

export const RdvContext = createContext<RdvApi>({ openRdv: () => {} });

/** Ouvre la modale de prise de rendez-vous depuis n'importe quel bouton du site. */
export const useRdv = () => useContext(RdvContext);
