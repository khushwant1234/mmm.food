// pages/protected.js
import { supabase } from "../lib/supabaseClient";

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.getUser(req.headers["cookie"]);

  if (!user) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
}

const ProtectedPage = ({ user }) => {
  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, {user.email}!</p>
    </div>
  );
};

export default ProtectedPage;
