import { useEffect, useState } from "react";

type Lead = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  business: string;
  platform: string;
  goal: string;
  phone?: string;
  companyUrl?: string;
  source?: string;
  description?: string;
  status?: string;
  adminNotes?: string;
};

const STATUS_OPTIONS = [
  "unattended",
  "viewed and awaiting response",
  "attended and confirmed",
  "attended and not confirmed",
  "completed",
];

const STATUS_COLORS: Record<string, string> = {
  "unattended": "bg-slate-100 text-slate-700 ring-slate-600/20",
  "viewed and awaiting response": "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
  "attended and confirmed": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "attended and not confirmed": "bg-red-50 text-red-700 ring-red-600/20",
  "completed": "bg-blue-50 text-blue-700 ring-blue-600/20",
};

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // View/Edit Modal State
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [savingAction, setSavingAction] = useState(false);
  const [deletingAction, setDeletingAction] = useState(false);

  // Add Lead Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    business: "",
    platform: "Shopify",
    goal: "Improve marketplace sales",
    phone: "",
    companyUrl: "",
    description: "",
    adminNotes: ""
  });
  const [addingLead, setAddingLead] = useState(false);

  useEffect(() => {
    document.title = "Admin Portal | SellSavvy";
    
    // Check if previously logged in
    const storedAuth = sessionStorage.getItem("adminAuth");
    if (storedAuth) {
      setIsLoggedIn(true);
      fetchLeads(storedAuth);
    }
  }, []);

  const fetchLeads = async (authString: string) => {
    setLoading(true);
    setError(null);
    try {
      const apiBase = import.meta.env.VITE_API_URL ?? "";
      const response = await fetch(`${apiBase}/api/admin/leads`, {
        headers: {
          Authorization: `Basic ${authString}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid username or password");
        }
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setLeads(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load leads";
      setError(msg);
      if (msg === "Invalid username or password") {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const authString = btoa(`${username}:${password}`);
    
    try {
      const apiBase = import.meta.env.VITE_API_URL ?? "";
      const response = await fetch(`${apiBase}/api/admin/leads`, {
        headers: {
          Authorization: `Basic ${authString}`,
        },
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      setLeads(data);
      setIsLoggedIn(true);
      sessionStorage.setItem("adminAuth", authString);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Failed to login");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("adminAuth");
    setLeads([]);
  };

  const openModal = (lead: Lead) => {
    setSelectedLead(lead);
    setEditStatus(lead.status || "unattended");
    setEditNotes(lead.adminNotes || "");
  };

  const closeModal = () => {
    setSelectedLead(null);
  };

  const saveLeadDetails = async () => {
    if (!selectedLead) return;
    setSavingAction(true);
    try {
      const authString = sessionStorage.getItem("adminAuth");
      const apiBase = import.meta.env.VITE_API_URL ?? "";
      const response = await fetch(`${apiBase}/api/admin/leads/${selectedLead.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authString}`,
        },
        body: JSON.stringify({
          status: editStatus,
          adminNotes: editNotes,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }

      const updatedLead = await response.json();
      setLeads(leads.map(l => l.id === updatedLead.id ? updatedLead : l));
      closeModal();
    } catch (err) {
      alert(err instanceof Error ? err.message : "An error occurred while saving.");
    } finally {
      setSavingAction(false);
    }
  };

  const deleteLead = async () => {
    if (!selectedLead) return;
    const confirm = window.confirm("Are you sure you want to delete this lead from the dashboard?\n\nNote: It will still be preserved in the immutable ledger for your records.");
    if (!confirm) return;

    setDeletingAction(true);
    try {
      const authString = sessionStorage.getItem("adminAuth");
      const apiBase = import.meta.env.VITE_API_URL ?? "";
      const response = await fetch(`${apiBase}/api/admin/leads/${selectedLead.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${authString}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete lead");
      }

      setLeads(leads.filter(l => l.id !== selectedLead.id));
      closeModal();
    } catch (err) {
      alert(err instanceof Error ? err.message : "An error occurred while deleting.");
    } finally {
      setDeletingAction(false);
    }
  };

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingLead(true);
    try {
      const authString = sessionStorage.getItem("adminAuth");
      const apiBase = import.meta.env.VITE_API_URL ?? "";
      const response = await fetch(`${apiBase}/api/admin/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authString}`,
        },
        body: JSON.stringify(newLead),
      });

      if (!response.ok) {
        throw new Error("Failed to add lead");
      }

      const addedLead = await response.json();
      setLeads([addedLead, ...leads]);
      setShowAddModal(false);
      setNewLead({
        name: "", email: "", business: "", platform: "Shopify", 
        goal: "Improve marketplace sales", phone: "", companyUrl: "", 
        description: "", adminNotes: ""
      });
    } catch (err) {
      alert(err instanceof Error ? err.message : "An error occurred while adding.");
    } finally {
      setAddingLead(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-900">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Admin Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Username</label>
                <input
                  type="text"
                  required
                  className="relative block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700 dark:focus:ring-emerald-500"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  required
                  className="relative block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700 dark:focus:ring-emerald-500"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {loginError && (
              <p className="text-sm font-medium text-red-500 text-center">{loginError}</p>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-slate-50 pt-[120px] pb-24 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Lead Dashboard</h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                A list of all users who have submitted the audit form. Click a row to view details.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 flex items-center space-x-4">
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20">
                Total: {leads.length}
              </span>
              <button
                onClick={() => setShowAddModal(true)}
                className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
              >
                + Add Lead
              </button>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                Log out
              </button>
            </div>
          </div>

          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg dark:ring-white/10">
                  
                  {loading ? (
                    <div className="flex h-64 items-center justify-center bg-white dark:bg-slate-800">
                      <p className="text-slate-500 dark:text-slate-400">Loading leads...</p>
                    </div>
                  ) : error ? (
                    <div className="flex h-64 items-center justify-center bg-white dark:bg-slate-800">
                      <p className="font-semibold text-red-500">{error}</p>
                    </div>
                  ) : leads.length === 0 ? (
                    <div className="flex h-64 items-center justify-center bg-white dark:bg-slate-800">
                      <p className="text-slate-500 dark:text-slate-400">No leads found yet.</p>
                    </div>
                  ) : (
                    <table className="min-w-full divide-y divide-slate-300 dark:divide-slate-700">
                      <thead className="bg-slate-50 dark:bg-slate-900/50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6 dark:text-slate-200">
                            Date
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-slate-200">
                            Contact
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-slate-200">
                            Business
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-slate-200">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-800">
                        {leads.map((lead) => {
                          const status = lead.status || "unattended";
                          const statusColor = STATUS_COLORS[status] || STATUS_COLORS["unattended"];
                          return (
                            <tr 
                              key={lead.id} 
                              onClick={() => openModal(lead)}
                              className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                            >
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-slate-500 sm:pl-6 dark:text-slate-400">
                                {new Date(lead.createdAt).toLocaleDateString()}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm">
                                <div className="font-medium text-slate-900 dark:text-slate-100">{lead.name}</div>
                                <div className="text-slate-500 dark:text-slate-400">
                                  {lead.email}
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
                                <div className="font-medium text-slate-900 dark:text-slate-100">{lead.business}</div>
                                <div className="text-slate-400 text-xs mt-1 truncate max-w-[150px]">{lead.goal}</div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm">
                                <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusColor}`}>
                                  {status.charAt(0).toUpperCase() + status.slice(1)}
                                </span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Details Modal */}
      {selectedLead && (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-slate-900/75 transition-opacity backdrop-blur-sm" onClick={closeModal}></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-2xl bg-white px-4 pb-4 pt-5 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-8 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button type="button" className="rounded-md bg-white text-slate-400 hover:text-slate-500 focus:outline-none dark:bg-slate-800 dark:hover:text-slate-300" onClick={closeModal}>
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold leading-6 text-slate-900 dark:text-white" id="modal-title">
                      Lead Details
                    </h3>
                    <button
                      onClick={deleteLead}
                      disabled={deletingAction}
                      className="text-xs font-semibold text-red-600 hover:text-red-500 disabled:opacity-50 flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                      </svg>
                      {deletingAction ? "Deleting..." : "Delete Lead"}
                    </button>
                  </div>
                  <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Received: {new Date(selectedLead.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Contact</h4>
                    <p className="mt-1 font-medium text-slate-900 dark:text-white">{selectedLead.name}</p>
                    <a href={`mailto:${selectedLead.email}`} className="block text-sm text-[var(--primary)] hover:underline mt-1">{selectedLead.email}</a>
                    {selectedLead.phone && <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{selectedLead.phone}</p>}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Business</h4>
                    <p className="mt-1 font-medium text-slate-900 dark:text-white">{selectedLead.business}</p>
                    {selectedLead.companyUrl && <a href={selectedLead.companyUrl} target="_blank" rel="noreferrer" className="block text-sm text-[var(--primary)] hover:underline mt-1">Visit Website ↗</a>}
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 capitalize">Platform: {selectedLead.platform}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Growth Goal</h4>
                    <p className="mt-1 text-sm text-slate-900 dark:text-white">{selectedLead.goal}</p>
                  </div>
                  {selectedLead.description && (
                    <div className="sm:col-span-2">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">User Description</h4>
                      <div className="mt-1 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                        {selectedLead.description}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Admin CRM</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-emerald-600 sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700 dark:focus:ring-emerald-500"
                      >
                        {STATUS_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Admin Notes & Logs</label>
                      <textarea
                        rows={4}
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        placeholder="Write down any call notes, next steps, or logs here..."
                        className="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-600 sm:text-sm sm:leading-6 dark:bg-slate-900 dark:text-white dark:ring-slate-700 dark:focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={saveLeadDetails}
                    disabled={savingAction}
                    className="inline-flex w-full justify-center rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 sm:ml-3 sm:w-auto disabled:opacity-70 transition-colors"
                  >
                    {savingAction ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mt-0 sm:w-auto dark:bg-slate-700 dark:text-slate-100 dark:ring-slate-600 dark:hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-slate-900/75 transition-opacity backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-2xl bg-white px-4 pb-4 pt-5 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-8 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                
                <div>
                  <h3 className="text-xl font-bold leading-6 text-slate-900 dark:text-white" id="modal-title">
                    Add Lead Manually
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Manually enter a lead. This will be saved to both your dashboard and your immutable ledger.
                  </p>
                </div>

                <form onSubmit={handleAddLead} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name *</label>
                    <input type="text" required value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} className="block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-emerald-600 sm:text-sm dark:bg-slate-900 dark:text-white dark:ring-slate-700 dark:focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email *</label>
                    <input type="email" required value={newLead.email} onChange={e => setNewLead({...newLead, email: e.target.value})} className="block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-emerald-600 sm:text-sm dark:bg-slate-900 dark:text-white dark:ring-slate-700 dark:focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Business Name *</label>
                    <input type="text" required value={newLead.business} onChange={e => setNewLead({...newLead, business: e.target.value})} className="block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-emerald-600 sm:text-sm dark:bg-slate-900 dark:text-white dark:ring-slate-700 dark:focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                    <input type="text" value={newLead.phone} onChange={e => setNewLead({...newLead, phone: e.target.value})} className="block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-emerald-600 sm:text-sm dark:bg-slate-900 dark:text-white dark:ring-slate-700 dark:focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Platform</label>
                    <input type="text" value={newLead.platform} onChange={e => setNewLead({...newLead, platform: e.target.value})} className="block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-emerald-600 sm:text-sm dark:bg-slate-900 dark:text-white dark:ring-slate-700 dark:focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Goal</label>
                    <input type="text" value={newLead.goal} onChange={e => setNewLead({...newLead, goal: e.target.value})} className="block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-emerald-600 sm:text-sm dark:bg-slate-900 dark:text-white dark:ring-slate-700 dark:focus:ring-emerald-500" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description / Additional Notes</label>
                    <textarea rows={2} value={newLead.description} onChange={e => setNewLead({...newLead, description: e.target.value})} className="block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-emerald-600 sm:text-sm dark:bg-slate-900 dark:text-white dark:ring-slate-700 dark:focus:ring-emerald-500" />
                  </div>
                  
                  <div className="sm:col-span-2 mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      disabled={addingLead}
                      className="inline-flex w-full justify-center rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 sm:ml-3 sm:w-auto disabled:opacity-70 transition-colors"
                    >
                      {addingLead ? "Adding..." : "Add Lead"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mt-0 sm:w-auto dark:bg-slate-700 dark:text-slate-100 dark:ring-slate-600 dark:hover:bg-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
