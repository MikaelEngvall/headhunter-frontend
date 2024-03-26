// Libraries, functions, etc.
import { useEffect, useState } from "react";
import { authorize } from "./components/security/authorize";
import { extractRolesFromToken } from "./components/security/token/extractRolesFromToken";

// Front page
import Welcome from "./components/front/Welcome";

// Sidebar
import Sidebar from "./components/sidebar/Sidebar";

import { S_Main } from "./components/utils/styledGlobal.js";

/**
 * App deals with the router setup and prevents the navbar from loading in without their being a JWT stored locally.
 *
 * States:
 * - 'isAuthorized': Sets to true if there is a JWT, and that JWT has not expired.
 */

export default function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [roles, setRoles] = useState("");

  /**
   * If isAuthorized changes, and if the value is false, it's being checked. If there is a JWT stored in the browser and it hasn't expired, isAuthorized is set to true. Otherwise, it remains false.
   */

  useEffect(() => {
    if (!isAuthorized) {
      setIsAuthorized(authorize());
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (isAuthorized) {
      setRoles(extractRolesFromToken);
    }
  }, [isAuthorized, setRoles]);

  console.log("App, isAuthorized:", isAuthorized);

  if (isAuthorized)
    return (
      <>
        <S_Main>
          <Sidebar roles={roles} setIsAuthorized={setIsAuthorized} />
        </S_Main>
      </>
    );

  return (
    <>
      <S_Main>
        <Welcome setIsAuthorized={setIsAuthorized} />
      </S_Main>
    </>
  );
}
