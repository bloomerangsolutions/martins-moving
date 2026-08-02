export default function JsonLd({ data }: { data: unknown[] }) {
  const blocks = data.filter(Boolean);
  if (!blocks.length) return null;
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
