
import makeFinalStore from 'alt/utils/makeFinalStore';

export default function(alt, storage, storeName) {
  const finalStorage = makeFinalStore(alt);

  try {
    alt.bootstrap(storage.get(storeName));
  } catch (err) {
    console.error('Failed to bootstrap data', err);
  }

  finalStorage.listen(() => {
    if (!storage.get('debug')) {
      storage.set(storeName, alt.takeSnapshot());
    }
  });
}
