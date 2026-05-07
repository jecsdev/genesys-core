export const BRANDING = {
  clientName: 'Luz y Esperanza',
  tagline: 'Tu paz es nuestro compromiso',
  poweredBy: 'Genesys Core',
  year: new Date().getFullYear(),
};

export const getCopyright = () =>
  `© ${BRANDING.year} ${BRANDING.clientName} · Powered by ${BRANDING.poweredBy}`;