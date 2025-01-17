import { getUsers } from "src/_actions/userActions";

export default async function Developer() {

  const res = await getUsers();
  console.log(res)
  return (
    <main>
      <h1>Hello</h1>
    </main>
  )
}