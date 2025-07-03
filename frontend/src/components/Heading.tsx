
interface HeadingProps {
  title: string;
  tagline?: string;
}

export default function Heading({ title, tagline }: HeadingProps) {
  return (
    <div className="text-center mb-6 bg-gray-50">
      <h1 className="text-2xl text-indigo-700 poppins-bold">{title}</h1>
      {tagline && (
        <p className="text-sm text-gray-500 mt-2 poppins-regular">{tagline}</p>
      )}
    </div>
  );
}