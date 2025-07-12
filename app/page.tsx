"use client";
import { useGetUsersQuery } from "./store/userApi";

export default function Home() {
  const { data, error, isLoading } = useGetUsersQuery({});
  console.log("bbb", data, error, isLoading);
  return (
    <div className="">
      <div className="">Hello World</div>
    </div>
  );
}
