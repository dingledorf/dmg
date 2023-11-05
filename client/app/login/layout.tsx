export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={"w-full flex flex-col min-h-screen relative justify-center"}>
      {children}
    </div>
  )
}