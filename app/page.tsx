"use client";
import { useGetUsersQuery } from "./store/userApi";

export default function Home() {
  const { data, error, isLoading } = useGetUsersQuery({ id: 122 });

  return (
    <div className="relative overflow-x-auto">
      <div
        className="py-3 px-1 flex items-center justify-between"
        style={{ backgroundColor: "#c2d82e" }}
      >
        <span className="text-blue-500 text-xs font-semibold me-2">
          <span className="block text-black text-base/8">
            Ledgerely Telemetry
          </span>
          <span className="bg-blue-500 text-white text-xs font-small px-2 py-1 me-1 rounded-sm dark:bg-purple-900 dark:text-purple-300">
            Total {data?.length} signed in users
          </span>
        </span>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-dark-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Login Count</th>
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
            data?.map(
              (
                user: { count: number; email: string; name: string },
                i: number
              ) => (
                <tr key={user.email}>
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.count}</td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
