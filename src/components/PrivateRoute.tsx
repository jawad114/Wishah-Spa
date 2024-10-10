// utils/withAuth.tsx
"use client"; // Ensure this component is a Client Component
import { useEffect } from "react";
import { FC } from "react";

const withAuth = <P extends object>(WrappedComponent: FC<P>) => {
  const ComponentWithAuth: FC<P> = (props) => {
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login"; 
      }
    }, [0]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
