import React from 'react';
import { Layout } from './features/ui/components';
import GridMap from './features/grid/components/GridMap';
import { useMouseAim } from './features/combat/hooks/useMouseAim';
import { useCombatSystem } from './features/combat/hooks/useCombatSystem';
import { useKeyboardShortcuts } from './features/ui/hooks/useKeyboardShortcuts';
import { usePlayerControls } from './features/player/hooks/usePlayerControls';
import { useHungerSystem } from './features/survival/hooks/useHungerSystem';
import { useThirstSystem } from './features/survival/hooks/useThirstSystem';
import { WeaponHUD } from './features/combat/components/WeaponHUD';

function App() {
  useKeyboardShortcuts();
  usePlayerControls();
  const { updateProjectiles } = useCombatSystem();
  useHungerSystem();
  useThirstSystem();

  // Update projectiles on each frame
  React.useEffect(() => {
    const interval = setInterval(updateProjectiles, 16); // ~60fps
    return () => clearInterval(interval);
  }, [updateProjectiles]);

  return (
    <Layout>
      <GridMap />
      <WeaponHUD />
    </Layout>
  );
}

export default App;