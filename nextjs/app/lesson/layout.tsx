export default function LessonLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-10">
      {children}
    </div>
  );
}
