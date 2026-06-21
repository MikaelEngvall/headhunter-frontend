import { useEffect, useState } from "react";
import { extractUsernameFromToken } from "../security/token/extractUsernameFromToken";
import { extractRolesFromToken } from "../security/token/extractRolesFromToken";
import LogoutSvg from "../utils/icons/logout.svg?react";
import AdminSvg from "../utils/icons/admin.svg?react";
import AccountSvg from "../utils/icons/account.svg?react";
import ListSvg from "../utils/icons/list.svg?react";
import ExpandedSvg from "../utils/icons/expanded.svg?react";
import CollapsedSvg from "../utils/icons/collapsed.svg?react";
import MyJobs from "../userCRUD/MyJobs";
import Admin from "../adminCRUD/Admin";

function NavItem({ icon: Icon, label, isActive, isExpanded, onClick }) {
  return (
    <button
      onClick={onClick}
      title={!isExpanded ? label : undefined}
      className={`sidebar-icon w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg transition-colors text-left
        ${isActive ? "active" : ""}`}
      style={{ justifyContent: isExpanded ? "flex-start" : "center" }}
    >
      <Icon className="w-5 h-5 flex-shrink-0" style={{ fill: "currentColor", minWidth: "1.25rem" }} />
      {isExpanded && (
        <span className={`text-sm font-medium whitespace-nowrap ${isActive ? "text-indigo-300" : "text-slate-400"}`}>
          {label}
        </span>
      )}
    </button>
  );
}

export default function Sidebar({ setIsAuthorized }) {
  const [active, setActive] = useState(null);
  const [isJobsVisible, setIsJobsVisible] = useState(false);
  const [isAdminVisible, setIsAdminVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    setUsername(extractUsernameFromToken());
    setRoles(extractRolesFromToken());
  }, []);

  function handleLogout() {
    localStorage.removeItem("headhunter-token");
    setIsAuthorized(false);
  }

  const isAdmin = Array.isArray(roles) && roles.includes("admin");

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out flex-shrink-0
          ${isExpanded ? "w-56" : "w-16"}`}
      >
        {/* Logo area */}
        <div className={`flex items-center gap-3 px-3 py-5 border-b border-slate-800 ${!isExpanded ? "justify-center" : ""}`}>
          <img
            src="./static/headhunter-logo.png"
            alt="Headhunter"
            className="w-8 h-8 flex-shrink-0 rounded-md"
          />
          {isExpanded && (
            <span className="font-bold text-white text-sm tracking-wide">Headhunter</span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 p-2 flex-1">
          <NavItem
            icon={AccountSvg}
            label="Account"
            isActive={active === "account"}
            isExpanded={isExpanded}
            onClick={() => { setActive("account"); setIsAdminVisible(false); setIsJobsVisible(false); }}
          />
          {isAdmin && (
            <>
              <NavItem
                icon={AdminSvg}
                label="Admin"
                isActive={active === "admin"}
                isExpanded={isExpanded}
                onClick={() => { setActive("admin"); setIsAdminVisible(true); setIsJobsVisible(false); }}
              />
              <NavItem
                icon={ListSvg}
                label="Job Ads"
                isActive={active === "jobs"}
                isExpanded={isExpanded}
                onClick={() => { setActive("jobs"); setIsAdminVisible(false); setIsJobsVisible(true); }}
              />
            </>
          )}
          {!isAdmin && (
            <NavItem
              icon={ListSvg}
              label="Job Ads"
              isActive={active === "jobs"}
              isExpanded={isExpanded}
              onClick={() => { setActive("jobs"); setIsJobsVisible(true); }}
            />
          )}
        </nav>

        {/* Bottom: user + logout */}
        <div className={`p-2 border-t border-slate-800 flex flex-col gap-1`}>
          {isExpanded && username && (
            <div className="px-2.5 py-2 text-xs text-slate-500 truncate">{username}</div>
          )}
          <NavItem
            icon={LogoutSvg}
            label="Log Out"
            isActive={false}
            isExpanded={isExpanded}
            onClick={handleLogout}
          />
          {/* Collapse toggle */}
          <button
            onClick={() => setIsExpanded((e) => !e)}
            className="sidebar-icon w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg"
            style={{ justifyContent: isExpanded ? "flex-start" : "center" }}
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded
              ? <ExpandedSvg className="w-4 h-4" style={{ fill: "#475569" }} />
              : <CollapsedSvg className="w-4 h-4" style={{ fill: "#475569" }} />
            }
            {isExpanded && <span className="text-xs text-slate-600">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-slate-950">
        {isAdminVisible && <Admin />}
        {isJobsVisible && <MyJobs />}
        {!isAdminVisible && !isJobsVisible && (
          <div className="flex items-center justify-center h-full min-h-[60vh]">
            <div className="text-center">
              <p className="text-slate-500 text-sm">Select a section from the sidebar</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
