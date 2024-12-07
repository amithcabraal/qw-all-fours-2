import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import GameBoard from './components/GameBoard';
import UI from './components/UI';
import Lighting from './components/scene/Lighting';
import Environment from './components/scene/Environment';
import { useDarkMode } from './hooks/useDarkMode';
import SplashScreen from './components/SplashScreen';
import BurgerMenu from './components/BurgerMenu';

function App() {
  const bgColor = useDarkMode();

  return (
    <div className="w-full h-screen bg-slate-100 dark:bg-slate-900 relative">
      <SplashScreen />
      <BurgerMenu />
      <UI />
      <Canvas
        camera={{ position: [10, 10, 10], fov: 45 }}
        className="w-full h-full"
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <Environment bgColor={bgColor} />
        <Lighting />
        <GameBoard />
        <OrbitControls
          minDistance={7}
          maxDistance={20}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
        />
        <Preload all />
      </Canvas>
    </div>
  );
}

export default App;