import React, { useEffect, useState } from "react";

type Dog = {
  id: number;
  KP: string;
  dogName: string;
  breedId: number;
  sireId: number;
  damId: number;
  dob: string;
  sex: "male" | "female";
  status: string;
};

type DogSiblingsProps = {
  dogId: number;
};

const DogList: React.FC<DogSiblingsProps> = ({ dogId }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/dog/siblings/${dogId}`);
        if (!response.ok) throw new Error("Failed to fetch dog data.");
        const data = await response.json();
        setDogs(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, [dogId]);

  // 💥 Use your updated return here:
  return (
    <div className="bg-gray-50 dark:bg-transparent border border-gray-700 py-10 px-4 transition-colors duration-300 rounded-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 dark:!text-blue-400 mb-8">
        Dog Siblings
      </h1>

      {loading && <p className="text-center text-gray-700 dark:text-gray-300">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all">
            <thead>
              <tr className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">ACC NO</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Sex</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">DOB</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {dogs.map((dog, index) => (
                <tr
                  key={dog.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">{dog.KP}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-100">
                    {dog.dogName}
                  </td>
                  <td className="px-6 py-4 text-sm capitalize text-gray-700 dark:text-gray-300">
                    {dog.sex}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {new Date(dog.dob).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{dog.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};


export default DogList;
