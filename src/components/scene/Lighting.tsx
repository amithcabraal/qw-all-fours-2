export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.5}
      />
    </>
  );
}