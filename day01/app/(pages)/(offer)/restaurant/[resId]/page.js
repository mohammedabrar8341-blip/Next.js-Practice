export default async function Pistahouse({ params }) {
  const { resId } = await params;
  return (
    <div>
      <h1 className="text-2xl font-bold bg-blue-500 text-white p-4">
        {resId} page
      </h1>
    </div>
  );
}
