"use client";
import { useGetUsersQuery } from "./store/userApi";

export default function Home() {
  const { data, error, isLoading } = useGetUsersQuery({ id: 122 });

  return (
    <div className="px-1 relative overflow-x-auto">
      <p className="py-3">Total logged in users ({data?.length})</p>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
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
