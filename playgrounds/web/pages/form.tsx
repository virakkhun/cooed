import { PageContext } from "@cooed/start";
import { useContext } from "react";

export default function () {
  const ctx = useContext(PageContext);
  return <form>{JSON.stringify(ctx.data)}</form>;
}
