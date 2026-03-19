"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Member {
  name: string;
  registerNumber?: string;
}

interface Registration {
  _id: string;
  leader: {
    firstName: string;
    lastName: string;
    email: string;
    github: string;
    bounty: string;
    registerNumber?: string;
    abstract?: string;
    department?: string;
    subdepartment?: string;
  };
  members: (string | Member)[];
  createdAt: string;
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/events/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setRegistrations(data.registrations);
      } else {
        setErrorMsg(data.message || "Invalid password");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Error connecting to server.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-brand-red selection:text-white p-6 sm:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10 border-b-4 border-brand-black pb-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-brand-black">
              System <span className="text-brand-red">Admin</span>
            </h1>
            <p className="font-mono text-sm text-brand-darkGray font-bold uppercase tracking-widest mt-2">
              Registration Database
            </p>
          </div>
          <Link href="/" className="btn-outline px-6 py-2 text-sm uppercase">
            Return to Site
          </Link>
        </div>

        {!isAuthenticated ? (
          <div className="max-w-md mx-auto bg-white p-8 border-4 border-brand-black shadow-brutal-lg">
            <h2 className="text-2xl font-black uppercase mb-6">Authenticate</h2>
            {errorMsg && (
              <div className="bg-red-100 border-2 border-brand-red text-brand-red font-bold p-3 text-sm mb-6">
                {errorMsg}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="text-xs font-bold text-brand-darkGray uppercase tracking-widest block mb-2">
                  Access Code
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="brutal-input w-full bg-brand-gray py-3 px-4 text-base text-brand-black focus:outline-none font-semibold focus:bg-white"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`btn-solid w-full py-4 text-sm uppercase tracking-widest ${
                  isLoading ? "opacity-80" : ""
                }`}
              >
                {isLoading ? "Verifying..." : "Access Data"}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white p-6 sm:p-8 border-4 border-brand-black shadow-brutal-lg overflow-x-auto custom-scrollbar">
            <h2 className="text-xl font-black uppercase mb-6 flex items-center justify-between">
              <span>Verified Entries</span>
              <span className="bg-brand-black text-brand-red px-3 py-1 text-sm font-mono shadow-brutal-red">
                TOTAL: {registrations.length}
              </span>
            </h2>
            
            {registrations.length === 0 ? (
              <p className="text-brand-darkGray font-medium">No registrations found in the system yet.</p>
            ) : (
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b-4 border-brand-black bg-gray-100">
                    <th className="p-4 font-black uppercase text-sm tracking-widest">Team Leader</th>
                    <th className="p-4 font-black uppercase text-sm tracking-widest">Email</th>
                    <th className="p-4 font-black uppercase text-sm tracking-widest">Target Bounty</th>
                    <th className="p-4 font-black uppercase text-sm tracking-widest">Timestamp</th>
                    <th className="p-4 font-black uppercase text-sm tracking-widest text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg) => (
                    <React.Fragment key={reg._id}>
                      <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-brand-black">
                            {reg.leader.firstName} {reg.leader.lastName}
                          </div>
                        </td>
                        <td className="p-4 font-medium text-sm">{reg.leader.email}</td>
                        <td className="p-4">
                          <span className="bg-brand-black text-white px-2 py-1 text-xs font-bold uppercase tracking-wider">
                            {reg.leader.bounty}
                          </span>
                        </td>
                        <td className="p-4 text-xs font-mono text-gray-500">
                          {new Date(reg.createdAt).toLocaleString()}
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => toggleRow(reg._id)}
                            className="bg-brand-black text-white text-[10px] font-bold uppercase tracking-wider px-3 py-2 hover:bg-brand-red transition-colors"
                          >
                            {expandedRow === reg._id ? "Close View" : "Advanced View"}
                          </button>
                        </td>
                      </tr>
                      {/* Expanded View */}
                      {expandedRow === reg._id && (
                        <tr className="bg-gray-50 border-b-4 border-brand-black">
                          <td colSpan={5} className="p-6">
                            <div className="grid md:grid-cols-2 gap-8">
                              <div>
                                <h4 className="font-black uppercase tracking-widest border-b-2 border-brand-red pb-1 mb-3 text-sm">Leader Info</h4>
                                <ul className="space-y-2 text-sm font-medium">
                                  <li><span className="text-gray-500 font-bold">Reg No:</span> {reg.leader.registerNumber || "N/A"}</li>
                                  <li><span className="text-gray-500 font-bold">Department:</span> {reg.leader.department || "N/A"}</li>
                                  <li><span className="text-gray-500 font-bold">Sub-Dept:</span> {reg.leader.subdepartment || "N/A"}</li>
                                  <li>
                                    <span className="text-gray-500 font-bold">GitHub:</span>{" "}
                                    <a href={reg.leader.github} target="_blank" rel="noreferrer" className="text-brand-red hover:underline">
                                      {reg.leader.github}
                                    </a>
                                  </li>
                                </ul>

                                <h4 className="font-black uppercase tracking-widest border-b-2 border-brand-red pb-1 mb-3 text-sm mt-6">Team Members</h4>
                                {reg.members.length > 0 ? (
                                  <ul className="space-y-2 text-sm font-medium list-disc list-inside">
                                    {reg.members.map((m, i) => {
                                      if (typeof m === 'string') {
                                        return <li key={i}>{m}</li>;
                                      }
                                      return (
                                        <li key={i}>
                                          {m.name} <span className="text-gray-500 font-mono text-xs ml-1">[{m.registerNumber || "N/A"}]</span>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                ) : (
                                  <span className="text-xs text-gray-400 font-bold uppercase">Solo Participant</span>
                                )}
                              </div>
                              
                              <div>
                                <h4 className="font-black uppercase tracking-widest border-b-2 border-brand-red pb-1 mb-3 text-sm">Project Abstract</h4>
                                <div className="bg-white p-4 border-2 border-gray-200 text-sm font-medium leading-relaxed min-h-[120px] whitespace-pre-wrap">
                                  {reg.leader.abstract || <span className="text-gray-400 italic">No abstract provided.</span>}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}