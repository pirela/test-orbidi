export default function Card({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex w-96 h-auto flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="p-8">
                {children}
            </div>
        </div>
    )
}


