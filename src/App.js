import { useEffect, useState } from "react";
import { authorize } from "./components/security/authorize";
import { extractRolesFromToken } from "./components/security/token/extractRolesFromToken";
import Welcome from "./components/front/Welcome";
import Sidebar from "./components/sidebar/Sidebar";

export default function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [roles, setRoles] = useState("");

  useEffect(() => {
    if (!isAuthorized) setIsAuthorized(authorize());
  }, [isAuthorized]);

  useEffect(() => {
    if (isAuthorized) setRoles(extractRolesFromToken);
  }, [isAuthorized]);

  if (isAuthorized)
    return <Sidebar roles={roles} setIsAuthorized={setIsAuthorized} />;

  return <Welcome setIsAuthorized={setIsAuthorized} />;
}
