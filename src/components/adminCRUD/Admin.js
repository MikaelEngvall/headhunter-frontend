import { useEffect, useState } from "react";
import { deleteUser } from "./adminFunctions/deleteUser";
import { findAllUsers } from "./adminFunctions/findAllUsers";
import AdminForm from "./AdminForm";

export default function Admin() {
  const [userList, setUserList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => { findAllUsers(setUserList); }, []);
  useEffect(() => { findAllUsers(setUserList); }, [refreshTable]);

  function handleUserCRUDSuccess() { setRefreshTable((r) => !r); }

  async function handleDelete(email) {
    if (window.confirm(`Delete user ${email}?`)) {
      await deleteUser(email);
      handleUserCRUDSuccess();
    }
  }

  return (
    <div className="page-section">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="section-title text-2xl">User Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage all registered users</p>
        </div>

        <div className={`card overflow-hidden transition-opacity ${isEditing ? "opacity-30 pointer-events-none" : ""}`}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-4 py-3 text-slate-400 font-medium w-24">Actions</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Email</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Username</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Roles</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, i) => (
                <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => { setIsEditing(true); setUserEmail(user.email); }}
                        className="btn-icon" title="Edit"
                      >✏️</button>
                      <button
                        onClick={() => handleDelete(user.email)}
                        className="btn-icon" title="Delete"
                      >🗑️</button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{user.email}</td>
                  <td className="px-4 py-3 text-slate-300">{user.username}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs">
                      {user.roles}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {userList.length === 0 && (
            <div className="text-center py-12 text-slate-600 text-sm">No users found</div>
          )}
        </div>

        {/* Edit modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <AdminForm
              email={userEmail}
              setIsEditing={setIsEditing}
              handleUserCRUDSuccess={handleUserCRUDSuccess}
            />
          </div>
        )}
      </div>
    </div>
  );
}
