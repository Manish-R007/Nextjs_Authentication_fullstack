export default async function UserProfile({ params }: any) {
  const { id } = await params;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-pink-500 p-4">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Profile
        </h1>

        <hr className="border-gray-300 dark:border-gray-600 mb-6" />

        <p className="text-2xl text-gray-700 dark:text-gray-300 mb-4">
          Profile page:
        </p>

        <span className="inline-block px-4 py-2 rounded bg-orange-500 text-black font-mono text-lg">
          {id}
        </span>
      </div>
    </div>
  );
}
