// Helper to preload lazy-loaded route chunks on demand or during idle
export const prefetchRoute = (route) => {
  if (route === 'founder') {
    import('../components/FounderPage');
  } else if (route === 'artist') {
    import('../components/ArtistPage');
  } else if (route === 'contact') {
    import('../components/ContactPage');
  }
};
