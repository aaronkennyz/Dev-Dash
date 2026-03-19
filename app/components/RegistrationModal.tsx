"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEPARTMENTS: Record<string, string[]> = {
  "School of Engineering": ["ISC", "ECE", "AIML", "CSE"],
  "School of Information Science and Technology": ["BCA", "BSc Computer Science/Animation/Data Analytics", "MCA", "MSc Software Technology/Bioinformatics/Data Science/Big Data Analytics"],
  "School of Commerce, Finance and Accountancy": ["BCom Regular", "BCom Professional (ACCA, CA integrated)", "BCom Logistics", "Business Analytics", "Investment Management"],
  "School of Life Sciences": ["Botany", "Zoology", "Microbiology", "Food Science"],
  "School of Vocational Studies": ["B.Voc in Retail and Logistics", "Animation & Multimedia", "Software Development", "Renewable Energy Management", "Sports, Therapy & Nutrition"],
  "School of Languages & Cultural Studies": ["English", "Hindi", "Kannada", "Konkani", "French", "German", "Spanish", "Sanskrit"],
  "School of Humanities & Social Sciences": ["Sociology", "Psychology", "History", "Journalism", "Economics", "Social Work"],
  "School of Physical Sciences": ["Statistics", "Electronics", "Physics", "Mathematics"],
  "Management Studies": ["BBA", "MBA", "M.A. in Business Economics"]
};

const STORAGE_KEY = "futuresprint_registration_draft";

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [leader, setLeader] = useState({
    firstName: "",
    lastName: "",
    email: "",
    github: "",
    bounty: "health",
    registerNumber: "",
    abstract: "",
    department: "",
    subdepartment: "",
  });
  const [members, setMembers] = useState(() => [{ id: Date.now(), name: "", registerNumber: "" }]);
  
  const [step, setStep] = useState<"form" | "payment" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Load from local storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          if (parsed.leader) setLeader(parsed.leader);
          if (parsed.members && Array.isArray(parsed.members)) setMembers(parsed.members);
        } catch (e) {
          console.error("Failed to parse saved registration data");
        }
      }
    }
  }, []);

  // Save to local storage whenever leader or members change
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Don't save if it's completely empty (prevents overwriting saved data immediately on mount)
      if (leader.firstName || leader.email || members[0].name) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ leader, members }));
      }
    }
  }, [leader, members]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (step === "success") {
        setStep("form"); // Reset to form if reopened after success
      }
      setErrorMsg("");
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, step]);

  const addMember = () => {
    if (members.length < 3) {
      setMembers([...members, { id: Date.now(), name: "", registerNumber: "" }]);
    }
  };

  const removeMember = (id: number) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const updateMember = (id: number, field: "name" | "registerNumber", value: string) => {
    setMembers(members.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  };

  const handleLeaderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLeader((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLeader((prev) => ({ ...prev, department: e.target.value, subdepartment: "" }));
  };

  const proceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const payload = {
        leader,
        members: members
          .filter((m) => m.name.trim() !== "")
          .map((m) => ({ name: m.name, registerNumber: m.registerNumber })),
      };

      const res = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStep("success");
        // Clear local storage on success
        if (typeof window !== "undefined") {
          localStorage.removeItem(STORAGE_KEY);
        }
        // Reset state
        setLeader({ firstName: "", lastName: "", email: "", github: "", bounty: "health", registerNumber: "", abstract: "", department: "", subdepartment: "" });
        setMembers([{ id: Date.now(), name: "", registerNumber: "" }]);
      } else {
        setErrorMsg(data.message || "Failed to register.");
        setStep("form"); // Go back to form if error
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected error occurred. Is the server running?");
      setStep("form");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
      aria-labelledby="register-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-brand-black/90 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="bg-white w-full max-w-2xl relative z-10 flex flex-col max-h-[90vh] shadow-brutal-xl border-[4px] border-brand-black animate-in fade-in zoom-in-95 duration-200">
        <button
          aria-label="Close Registration Modal"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-brand-red border-2 border-transparent hover:border-brand-black transition-all z-20 focus:outline-none focus:ring-2 focus:ring-brand-black"
        >
          <i className="fa-solid fa-xmark text-xl sm:text-2xl"></i>
        </button>

        <div className="p-6 sm:p-10 md:p-12 overflow-y-auto custom-scrollbar relative">
          <div className="absolute right-5 sm:right-10 top-10 sm:top-20 font-graffiti text-brand-red opacity-[0.05] text-5xl sm:text-8xl transform rotate-12 pointer-events-none">
            SQUAD
          </div>

          <div className="mb-8 sm:mb-10 border-b-[3px] border-brand-black pb-4 sm:pb-5 relative z-10 pr-8">
            <h3 id="register-title" className="text-3xl sm:text-4xl font-black uppercase tracking-tighter mb-1 sm:mb-2">
              Join FutureSprint
            </h3>
            <p className="font-mono text-[10px] sm:text-xs text-brand-red font-bold uppercase tracking-[0.2em]">
              {step === "payment" ? "Registration Fee Payment" : "Execute Registration Protocol"}
            </p>
          </div>

          {step === "form" && (
            <form id="register-form" className="space-y-6 sm:space-y-8 relative z-10" onSubmit={proceedToPayment}>
              {errorMsg && (
                <div className="bg-red-100 border-2 border-brand-red text-brand-red font-bold p-3 text-sm">
                  {errorMsg}
                </div>
              )}

              {/* Team Leader Info */}
              <div className="bg-gray-50/50 p-4 sm:p-6 border-2 border-gray-200">
                <h4 className="text-sm sm:text-base font-black uppercase border-l-[3px] border-brand-red pl-3 mb-4 sm:mb-5 tracking-wide">
                  Team Leader
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold text-brand-darkGray uppercase tracking-widest">First Name</label>
                    <input type="text" name="firstName" value={leader.firstName} onChange={handleLeaderChange} required className="brutal-input w-full bg-brand-gray py-3 sm:py-3.5 px-4 text-sm sm:text-base text-brand-black focus:outline-none font-semibold focus:bg-white placeholder-gray-400" placeholder="Jane" />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold text-brand-darkGray uppercase tracking-widest">Last Name</label>
                    <input type="text" name="lastName" value={leader.lastName} onChange={handleLeaderChange} required className="brutal-input w-full bg-brand-gray py-3 sm:py-3.5 px-4 text-sm sm:text-base text-brand-black focus:outline-none font-semibold focus:bg-white placeholder-gray-400" placeholder="Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold text-brand-darkGray uppercase tracking-widest">Email Address</label>
                    <input type="email" name="email" value={leader.email} onChange={handleLeaderChange} required className="brutal-input w-full bg-brand-gray py-3 sm:py-3.5 px-4 text-sm sm:text-base text-brand-black focus:outline-none font-semibold focus:bg-white placeholder-gray-400" placeholder="jane.doe@example.com" />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold text-brand-darkGray uppercase tracking-widest">Register Number</label>
                    <input type="text" name="registerNumber" value={leader.registerNumber} onChange={handleLeaderChange} required className="brutal-input w-full bg-brand-gray py-3 sm:py-3.5 px-4 text-sm sm:text-base text-brand-black focus:outline-none font-semibold focus:bg-white placeholder-gray-400" placeholder="Ex: 234050" />
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                  <label className="text-[10px] sm:text-xs font-bold text-brand-darkGray uppercase tracking-widest">GitHub / Portfolio URL</label>
                  <input type="url" name="github" value={leader.github} onChange={handleLeaderChange} required className="brutal-input w-full bg-brand-gray py-3 sm:py-3.5 px-4 text-sm sm:text-base text-brand-black focus:outline-none font-semibold focus:bg-white placeholder-gray-400" placeholder="https://github.com/janedoe" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold text-brand-darkGray uppercase tracking-widest">Department</label>
                    <div className="relative">
                      <select name="department" value={leader.department} onChange={handleDepartmentChange} required className="brutal-input w-full bg-brand-gray py-3 sm:py-3.5 px-4 text-sm sm:text-base text-brand-black focus:outline-none font-semibold focus:bg-white appearance-none pr-10">
                        <option value="">Select Department</option>
                        {Object.keys(DEPARTMENTS).map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-black">
                        <i className="fa-solid fa-chevron-down"></i>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold text-brand-darkGray uppercase tracking-widest">Sub-Department</label>
                    <div className="relative">
                      <select name="subdepartment" value={leader.subdepartment} onChange={handleLeaderChange} required disabled={!leader.department} className="brutal-input w-full bg-brand-gray py-3 sm:py-3.5 px-4 text-sm sm:text-base text-brand-black focus:outline-none font-semibold focus:bg-white appearance-none pr-10 disabled:opacity-50">
                        <option value="">Select Option</option>
                        {leader.department && DEPARTMENTS[leader.department].map((sub) => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-black">
                        <i className="fa-solid fa-chevron-down"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Team Members Section */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-4 sm:mb-5">
                  <h4 className="text-sm sm:text-base font-black uppercase border-l-[3px] border-brand-red pl-3 tracking-wide">
                    Team Members (Min 1)
                  </h4>
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-brand-red bg-red-50 border border-brand-red px-2 py-1" id="team-count">
                    {members.length + 1}/4
                  </span>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  {members.map((member, index) => (
                    <div key={member.id} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <input
                        type="text"
                        placeholder="Member Name"
                        required
                        value={member.name}
                        onChange={(e) => updateMember(member.id, "name", e.target.value)}
                        className="brutal-input flex-1 bg-brand-gray py-3.5 px-4 text-sm sm:text-base text-brand-black focus:outline-none font-semibold focus:bg-white placeholder-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Register No"
                        required
                        value={member.registerNumber}
                        onChange={(e) => updateMember(member.id, "registerNumber", e.target.value)}
                        className="brutal-input w-full sm:w-1/3 bg-brand-gray py-3.5 px-4 text-sm sm:text-base text-brand-black focus:outline-none font-semibold focus:bg-white placeholder-gray-400"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeMember(member.id)}
                          className="text-gray-500 hover:text-white hover:bg-brand-red bg-gray-100 border-2 border-transparent hover:border-brand-black transition-colors h-[48px] sm:h-[56px] px-4 flex items-center justify-center shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-black"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {members.length < 3 && (
                  <button
                    type="button"
                    onClick={addMember}
                    className="w-full py-3 sm:py-4 mt-4 border-2 border-brand-red border-dashed text-brand-red text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-brand-red hover:text-white transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red"
                  >
                    <i className="fa-solid fa-plus"></i> Add Team Member
                  </button>
                )}
              </div>

              {/* Bounty & Abstract */}
              <div className="space-y-6 pt-6 border-t-2 border-gray-200">
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-[10px] sm:text-xs font-bold text-brand-darkGray uppercase tracking-widest">
                    Target Bounty
                  </label>
                  <div className="relative">
                    <select
                      name="bounty"
                      value={leader.bounty}
                      onChange={handleLeaderChange}
                      className="brutal-input w-full bg-white py-3.5 sm:py-4 px-4 text-sm sm:text-base text-brand-black focus:outline-none cursor-pointer appearance-none font-semibold pr-10"
                    >
                      <option value="health">Healthcare</option>
                      <option value="fintech">Fintech</option>
                      <option value="sustain">Sustainable Tech</option>
                      <option value="agri">Agriculture</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-black">
                      <i className="fa-solid fa-chevron-down"></i>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-[10px] sm:text-xs font-bold text-brand-darkGray uppercase tracking-widest">
                    Project Abstract
                  </label>
                  <textarea
                    name="abstract"
                    value={leader.abstract}
                    onChange={handleLeaderChange}
                    required
                    rows={4}
                    className="brutal-input w-full bg-brand-gray py-3 sm:py-3.5 px-4 text-sm sm:text-base text-brand-black focus:outline-none font-semibold focus:bg-white placeholder-gray-400 resize-y"
                    placeholder="Briefly describe what you intend to build..."
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 sm:mt-6">
                <p className="text-xs text-brand-darkGray font-medium">Draft saved locally <i className="fa-solid fa-cloud-arrow-down ml-1"></i></p>
                <button
                  type="submit"
                  className="btn-accent px-8 py-4 sm:py-5 text-sm sm:text-base uppercase tracking-widest"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          )}

          {step === "payment" && (
            <div className="flex flex-col items-center justify-center py-6 text-center relative z-10 animate-in fade-in zoom-in">
              <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-4">
                Registration Fee Validation
              </h4>
              <p className="text-brand-darkGray text-sm font-medium mb-6 max-w-md">
                Scan the QR code below using your preferred UPI app to complete the registration fee payment. Your registration will be manually verified.
              </p>
              
              <div className="bg-gray-100 p-4 border-[3px] border-brand-black shadow-brutal-md mb-8 inline-block">
                {/* We use eslint-disable-next-line to avoid issues if next/image is strict, but standard next/image works */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/assets/qr-code.jpg" 
                  alt="Payment QR Code" 
                  className="w-48 h-48 sm:w-64 sm:h-64 object-cover"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="btn-outline px-6 py-4 text-sm uppercase tracking-widest"
                  disabled={isSubmitting}
                >
                  <i className="fa-solid fa-arrow-left mr-2"></i> Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`btn-accent px-8 py-4 text-sm uppercase tracking-widest ${
                    isSubmitting ? "opacity-80 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>Processing
                    </>
                  ) : (
                    "Confirm Payment & Submit"
                  )}
                </button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center justify-center py-10 sm:py-16 text-center relative z-10 animate-in fade-in zoom-in">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-black flex items-center justify-center mb-6 sm:mb-8 text-white shadow-brutal-red border-[3px] border-brand-black">
                <i className="fa-solid fa-check text-2xl sm:text-4xl"></i>
              </div>
              <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2 sm:mb-3">
                Application Received
              </h4>
              <p className="text-brand-darkGray text-sm sm:text-base font-medium mb-8 sm:mb-10 px-4">
                Data successfully committed to the mainframe.<br className="hidden sm:block" />{" "}
                Payment manual verification is pending. Awaiting email confirmation.
              </p>
              <button
                onClick={onClose}
                className="btn-solid px-8 py-3.5 sm:px-10 sm:py-4 text-xs sm:text-sm uppercase tracking-widest"
              >
                Close Terminal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}