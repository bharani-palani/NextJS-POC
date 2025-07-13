"use client";
import { useGetUsersQuery, useCreateUserMutation } from "./store/userApi";

export default function Home() {
  const { data, error, isLoading } = useGetUsersQuery({ id: 122 });
  const [createUser] = useCreateUserMutation();

  const handleCreateUser = async () => {
    const newUser = { email: "newuser@example.com" };
    await createUser(newUser);
  };

  return (
    <div className="relative overflow-x-auto">
      <p className="py-3 px-1 bg-green-100">
        <span className="text-blue-500 text-xs font-semibold me-2">
          Ledgerely - Total signed in in users of count {process.env.USER}
        </span>
        <span className="bg-blue-500 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-purple-900 dark:text-purple-300">
          {data?.length}
        </span>
        <button
          onClick={handleCreateUser}
          className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create User
        </button>
      </p>
      <table className="w-full text-sm text-left rtl:text-right text-dark-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Count</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr key={"loading"}>
              <td colSpan={2} className="text-center">
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr key={"error"}>
              <td colSpan={2} className="text-center text-red-500">
                Error
              </td>
            </tr>
          ) : (
            data?.map((user: { count: number; email: string }, i: number) => (
              <tr key={user.email}>
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.count}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
