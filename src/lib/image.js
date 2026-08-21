function hashSeed(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % 1000;
}

/**
 * Keyword-searchable placeholder photo (loremflickr.com) so mock imagery is at
 * least thematically relevant instead of fully random. `lock` pins a stable
 * result per seed so the same event/card doesn't reshuffle on every reload.
 * Swap for real club photography before launch.
 */
export function themedImage(keywords, seed, width = 800, height = 600) {
  return `https://loremflickr.com/${width}/${height}/${keywords}?lock=${hashSeed(seed)}`;
}
