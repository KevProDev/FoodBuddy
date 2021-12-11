import { useSession, getSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();

  if (typeof window !== "undefined") return null;

  if (session) {
    return (
      <div>
        <h1>Protected Page</h1>
        <p>You can view this page because you are signed in.</p>
      </div>
    );
  }
  return (
    <div>
      <p>Access Denied</p>;
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}