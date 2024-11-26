import React, { useState, useEffect } from "react";
import { ArrowUpCircle, Clock, Search } from "lucide-react";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "admin", permissions: ["Create", "Add", "Remove", "Update", "View"] },
    { id: 2, name: "Jane Smith", role: "team lead", permissions: ["Add", "Update", "Remove"] },
    { id: 3, name: "Mark Johnson", role: "member", permissions: ["View"] },
    ...Array.from({ length: 55 }, (_, i) => ({
      id: i + 4,
      name: `User ${i + 1}`,
      role: ["admin", "team lead", "member"][Math.floor(Math.random() * 3)],
      permissions: [],
    })),
  ]);
  const [modalUser, setModalUser] = useState(null);
  const [filters, setFilters] = useState({ id: "", name: "", role: "" });
  const [showFilters, setShowFilters] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [auditLogs, setAuditLogs] = useState([]);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [auditFilters, setAuditFilters] = useState({ action: "", user: "", date: "" });

  const rolePermissions = {
    admin: ["Create", "Add", "Remove", "Update", "View"],
    "team lead": ["Add", "Update", "View"],
    member: ["View"],
  };

  const allPermissions = ["Create", "Add", "Remove", "Update", "View"];

  const roleStyles = {
    admin: "bg-green-500 text-white",
    "team lead": "bg-blue-500 text-white",
    member: "bg-gray-400 text-white",
  };

  // Audit log functions
  const addAuditLog = (action, details) => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      action,
      details,
    };
    setAuditLogs(prevLogs => [newLog, ...prevLogs]);
  };

  const handleAuditFilterChange = (e) => {
    const { name, value } = e.target;
    setAuditFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredAuditLogs = auditLogs.filter(log => {
    return (
      (auditFilters.action === "" || log.action.toLowerCase().includes(auditFilters.action.toLowerCase())) &&
      (auditFilters.user === "" || log.details.toLowerCase().includes(auditFilters.user.toLowerCase())) &&
      (auditFilters.date === "" || log.timestamp.includes(auditFilters.date))
    );
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  React.useEffect(() => {
    setUsers(prevUsers =>
      prevUsers.map(user => ({
        ...user,
        permissions: user.permissions?.length ? user.permissions : rolePermissions[user.role] || []
      }))
    );
  }, []);

  const openModal = (user) => {
    setModalUser({
      ...user,
      permissions: user.permissions || rolePermissions[user.role] || [],
    });
    setIsEditable(false);
  };

  const closeModal = () => {
    setModalUser(null);
    setIsEditable(false);
  };

  const togglePermission = (permission) => {
    if (!isEditable) return;
    setModalUser((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((perm) => perm !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const saveModalChanges = () => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === modalUser.id
          ? {
            ...modalUser,
            role: modalUser.role,
            permissions: modalUser.permissions
          }
          : user
      )
    );
    //  Add audit log for user update
    addAuditLog(
      "UPDATE",
      `Updated user ${modalUser.name} (ID: ${modalUser.id}) - Role: ${modalUser.role}, Permissions: ${modalUser.permissions.join(", ")}`
    );
    closeModal();
    alert("User details updated successfully.");
  };

  const deleteUser = (userId) => {
    const userToDelete = users.find(user => user.id === userId);
    setUsers((prev) => prev.filter((user) => user.id !== userId));
    // Add audit log for user deletion
    addAuditLog(
      "DELETE",
      `Deleted user ${userToDelete.name} (ID: ${userToDelete.id})`
    );
    setShowDeleteConfirm(null);
    alert("User deleted successfully.");
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredUsers = users.filter((user) => {
    return (
      (filters.id === "" || user.id.toString().includes(filters.id)) &&
      (filters.name === "" ||
        user.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.role === "" ||
        user.role.toLowerCase().includes(filters.role.toLowerCase()))
    );
  });

  const toggleFilterBar = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="bg-blue-100 min-h-screen flex-1 flex flex-col p-4 md:p-8">
        {/* <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">User Management Dashboard</h1> */}

        <div className="w-full max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
          <h1 className="text-lg md:text-xl font-semibold">DASHBOARD</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAuditModal(true)}
              className="px-3 py-1 md:px-4 md:py-2 rounded bg-purple-500 text-white flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Audit Logs
            </button>
            <button
              onClick={toggleFilterBar}
              className={`px-3 py-1 md:px-4 md:py-2 rounded ${showFilters ? "bg-red-500" : "bg-blue-500"} text-white`}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-4 md:p-6 mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="id"
                value={filters.id}
                onChange={handleFilterChange}
                placeholder="Filter by ID"
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
                placeholder="Filter by Name"
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                name="role"
                value={filters.role}
                onChange={handleFilterChange}
                placeholder="Filter by Role"
                className="border p-2 rounded w-full"
              />
            </div>
          </div>
        )}

        <div className="w-full max-w-6xl bg-gray-50 shadow-md rounded-2xl p-4 md:p-6 overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-6 py-3 text-center font-semibold">ID</th>
                <th className="px-6 py-3 text-center font-semibold">Name</th>
                <th className="px-6 py-3 text-center font-semibold">Role</th>
                <th className="px-6 py-3 text-center hidden md:table-cell font-semibold">Permissions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-100 cursor-pointer group transition-colors duration-200 relative"
                  onClick={(e) => {
                    if (e.target.closest(".action-btn")) return;
                    openModal(user);
                  }}
                >
                  {/* ID Column */}
                  <td className="px-6 py-4 text-center text-gray-800">{user.id}</td>

                  {/* Name Column */}
                  <td className="px-6 py-4 text-center text-gray-800">{user.name}</td>

                  {/* Role Column */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-2 py-2 rounded-md text-sm font-medium ${{
                          admin: "bg-purple-100 text-gray-600",
                          teamLead: "bg-blue-700 text-blue-700",
                          member: "bg-gray-100 text-gray-600",
                        }[user.role] || "bg-blue-100 text-gray-600"
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Permissions Column */}
                  <td className="px-6 py-4 text-center hidden md:table-cell">
                    <div className="flex flex-wrap justify-center gap-2">
                      {allPermissions.map((permission) => (
                        <div
                          key={permission}
                          className={`px-3 py-1 rounded-md text-xs font-medium ${user.permissions.includes(permission)
                              ? "bg-indigo-100 text-gray-800"
                              : "bg-gray-200 text-gray-500"
                            }`}
                        >
                          {permission}
                        </div>
                      ))}
                    </div>

                    {/* Hover Action Buttons */}
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        className="action-btn text-blue-600 hover:text-blue-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(user);
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        className="action-btn text-red-600 hover:text-red-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDeleteConfirm(user.id);
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>



        {/* Scroll to Top Button */}
        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200 z-50"
            aria-label="Scroll to top"
          >
            <ArrowUpCircle className="w-6 h-6" />
          </button>
        )}
        {/* Audit Logs Modal */}
        {showAuditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
              <div className="p-4 md:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Audit Logs</h3>
                  <button
                    onClick={() => setShowAuditModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>

                {/* Audit Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    name="action"
                    value={auditFilters.action}
                    onChange={handleAuditFilterChange}
                    placeholder="Filter by Action"
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="user"
                    value={auditFilters.user}
                    onChange={handleAuditFilterChange}
                    placeholder="Filter by User"
                    className="border p-2 rounded"
                  />
                  <input
                    type="date"
                    name="date"
                    value={auditFilters.date}
                    onChange={handleAuditFilterChange}
                    className="border p-2 rounded"
                  />
                </div>

                {/* Audit Logs Table */}
                <div className="overflow-y-auto max-h-[60vh]">
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border p-2 text-left">Timestamp</th>
                        <th className="border p-2 text-left">Action</th>
                        <th className="border p-2 text-left">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAuditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className="border p-2">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                          <td className="border p-2">
                            <span
                              className={`px-2 py-1 rounded text-white ${log.action === "UPDATE"
                                ? "bg-blue-500"
                                : log.action === "DELETE"
                                  ? "bg-red-500"
                                  : "bg-green-500"
                                }`}
                            >
                              {log.action}
                            </span>
                          </td>
                          <td className="border p-2">{log.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
              <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
              <p className="mb-4">Are you sure you want to delete this user?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => deleteUser(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* User Edit Modal */}
        {modalUser && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-40 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative border border-gray-200">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800">User Profile</h3>
                <button
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-600 w-8 h-8 rounded-full shadow-md hover:bg-gray-400 hover:text-gray-700 flex items-center justify-center transition-colors"
                  aria-label="Close Modal"
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 md:p-6">
                {/* ID Field */}
                <p className="mb-4">
                  <strong className="text-gray-700">ID:</strong> {modalUser.id}
                </p>

                {/* Name Field */}
                <p className="mb-4">
                  <strong className="text-gray-700">Name:</strong>
                  <input
                    type="text"
                    value={modalUser.name}
                    readOnly={!isEditable}
                    onChange={(e) =>
                      setModalUser({ ...modalUser, name: e.target.value })
                    }
                    className={`border px-2 py-2 rounded w-full ${isEditable ? "border-blue-300" : "bg-gray-100 border-gray-300 cursor-not-allowed"}`}
                  />
                </p>

                {/* Role Field */}
                <div className="mb-4">
                  <label className="block font-medium text-gray-700 mb-1">Role:</label>
                  <select
                    value={modalUser.role}
                    disabled={!isEditable}
                    onChange={(e) =>
                      setModalUser({ ...modalUser, role: e.target.value })
                    }
                    className={`border rounded px-3 py-2 w-full ${isEditable ? "border-blue-300" : "bg-gray-100 border-gray-300 cursor-not-allowed"}`}
                  >
                    {Object.keys(rolePermissions).map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Permissions Field */}
                <div className="mb-6">
                  <label className="block font-medium text-gray-700 mb-2">Permissions:</label>
                  <div className="flex flex-wrap gap-2">
                    {allPermissions.map((permission) => (
                      <div
                        key={permission}
                        className={`px-3 py-1 rounded cursor-pointer text-sm font-medium ${modalUser.permissions.includes(permission)
                            ? "bg-blue-400 text-white"
                            : "bg-gray-300 text-gray-700"
                          }`}
                        onClick={() => togglePermission(permission)}
                      >
                        {permission}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  {isEditable ? (
                    <button
                      onClick={saveModalChanges}
                      className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditable(true)}
                      className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-indigo-600 transition-colors"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => {
                      deleteUser(modalUser.id);
                      closeModal();
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;