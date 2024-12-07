interface EnvironmentProps {
  bgColor: string;
}

export default function Environment({ bgColor }: EnvironmentProps) {
  return (
    <>
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" args={[bgColor, 10, 25]} />
    </>
  );
}