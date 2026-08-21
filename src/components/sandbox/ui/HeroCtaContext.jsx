import { createContext, useContext, useState } from 'react';

const HeroCtaContext = createContext({
  heroCtaVisible: true,
  setHeroCtaVisible: () => {},
});

export function HeroCtaProvider({ children }) {
  const [heroCtaVisible, setHeroCtaVisible] = useState(true);
  return (
    <HeroCtaContext.Provider value={{ heroCtaVisible, setHeroCtaVisible }}>
      {children}
    </HeroCtaContext.Provider>
  );
}

export function useHeroCta() {
  return useContext(HeroCtaContext);
}
