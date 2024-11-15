import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return <Component {...pageProps} session={session} />;
}

export default MyApp;
