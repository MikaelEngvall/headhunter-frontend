import { useEffect, useState } from "react";
import { updateUser } from "./adminFunctions/updateUser";
import { findUserByEmail } from "./adminFunctions/findUserByEmail";

export default function AdminForm({ setIsEditing, email, handleUserCRUDSuccess }) {
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    findUserByEmail(email, setUsername, setRoles);
  }, [email]);

  async function handleSave() {
    setLoading(true);
    await updateUser(email, username, roles, handleUserCRUDSuccess, () => setIsEditing(false));
    setLoading(false);
  }

  return (
    <div className="card p-6 w-full max-w-md mx-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="section-title">Edit User</h2>
        <button onClick={() => setIsEditing(false)} className="btn-ghost text-lg leading-none">✕</button>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="label">Email</label>
          <input value={email} readOnly className="input-field opacity-50 cursor-not-allowed" />
        </div>
        <div>
          <label className="label">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="label">Roles</label>
          <input
            type="text"
            value={roles}
            onChange={(e) => setRoles(e.target.value)}
            className="input-field"
            placeholder="e.g. admin user"
          />
        </div>
        <div className="flex gap-3 mt-2">
          <button
            onClick={handleSave}
            disabled={loading}
            className="btn-primary flex-1 disabled:opacity-50"
          >
            {loading ? "Saving…" : "Save Changes"}
          </button>
          <button onClick={() => setIsEditing(false)} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
