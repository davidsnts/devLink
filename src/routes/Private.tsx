import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/FirebaseConnection";
import { ReactNode, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps): any {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState<any>(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        };
        localStorage.setItem("@reactLinks", JSON.stringify(userData));
        setSigned(true);
        setLoading(false);
      } else {
        setLoading(false);
        setSigned(false);
      }
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="flex w-full h-screen items-center justify-center flex-col">
        <h1 className="text-white font-bold text-5xl">Carregando...</h1>
      </div>
    );   
  }
  if (!signed) {
      return <Navigate to="/login" />;
    }
  return children ? children : <Navigate to="/login" />;
}
