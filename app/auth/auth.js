import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error("Error signing in with email:", error.message);
      alert("Error signing in: " + error.message);
    } else {
      alert("Sign-in successful!");
    }
  };

  const handleEmailSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error("Error signing up with email:", error.message);
      alert("Error signing up: " + error.message);
    } else {
      alert("Check your email for a confirmation link!");
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) {
      console.error("Error signing in with Google:", error.message);
      alert("Error signing in with Google: " + error.message);
    }
  };

  return (
    <div>
      <h1>Login or Sign Up</h1>
      <div>
        <h2>Email Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleEmailSignIn}>Sign In with Email</button>
        <button onClick={handleEmailSignUp}>Sign Up with Email</button>
      </div>
      <div>
        <h2>Or</h2>
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      </div>
    </div>
  );
};

export default Auth;
