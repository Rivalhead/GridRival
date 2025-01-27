import { lazy } from 'react';

export function createLazyComponent(importFn: () => Promise<any>) {
  return lazy(() => 
    importFn().catch((error) => {
      console.error('Error loading component:', error);
      return { default: () => <div>Error loading component</div> };
    })
  );
}