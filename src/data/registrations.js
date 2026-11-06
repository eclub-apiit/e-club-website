// Sandbox is a separate inter-school competition, with its own application form.
export const sandbox = {
  name: 'Sandbox 3.0',
  route: '/sandbox/',
  registrationUrl: 'https://forms.gle/aA7xeVSHBGGSuhs87',
  deadline: '2026-11-30T23:59:59+05:30',
  description: 'A national inter-school business pitching competition organised by the APIIT Entrepreneurship Club for school students.',
};

// Keep the homepage invitation through 26 November in Sri Lanka.
export const convergencePromotionEndsAt = Date.parse('2026-11-27T00:00:00+05:30');
export const isConvergencePromoted = (now = Date.now()) => now < convergencePromotionEndsAt;
