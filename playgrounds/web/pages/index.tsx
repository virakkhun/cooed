import { PageContext } from "@cooed/start";
import { useContext } from "react";

export const loader$ = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
  return data;
};

export default function () {
  const ctx = useContext(PageContext);

  return (
    <main className="px-16 py-4">
      <a href="/blogs">blogs</a>
      <h1 className="text-2xl text-black">Hello bro</h1>
      <div>{JSON.stringify(ctx.data, null, 2)}</div>
    </main>
  );
}
