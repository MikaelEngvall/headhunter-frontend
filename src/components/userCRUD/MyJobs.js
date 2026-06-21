import { useEffect, useState } from "react";
import { addJob } from "./jobFunctions/addJob.js";
import { getAllMyJobs } from "./jobFunctions/getAllMyJobs.js";
import { deleteJob } from "./jobFunctions/deleteJob.js";
import JobEdit from "./JobEdit.js";
import Ad from "./Ad.js";
import AddSvg from "../utils/icons/add.svg?react";
import DeleteSvg from "../utils/icons/delete.svg?react";

export default function MyJobs() {
  const [jobList, setJobList] = useState([]);
  const [jobId, setJobId] = useState(null);
  const [refreshTable, setRefreshTable] = useState(false);
  const [jobVisible, setJobVisible] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [refreshAdTabs, setRefreshAdTabs] = useState(false);
  const [adsExist, setAdsExist] = useState(false);

  useEffect(() => { getAllMyJobs(setJobList); }, [refreshTable]);
  useEffect(() => { getAllMyJobs(setJobList); }, []);

  function handleAddJob() { addJob(handleJobCRUDSuccess); }

  function handleDeleteJob(id) {
    if (!id) return;
    if (window.confirm("Delete this job?")) {
      deleteJob(id, handleJobCRUDSuccess);
      setJobVisible(false);
      setJobId(null);
    }
  }

  function handlePreview(id, numAds) {
    if (isChange && !window.confirm("Leave without saving?")) return;
    setIsChange(false);
    setJobId(id);
    setJobVisible(true);
    setAdsExist(numAds > 0);
  }

  function handleJobCRUDSuccess() { setRefreshTable((r) => !r); }
  function handleAdCRUDSuccess() { setRefreshAdTabs((r) => !r); }

  return (
    <div className="flex h-full min-h-screen bg-slate-950">
      {/* Left panel — job list */}
      <aside className="w-64 flex-shrink-0 border-r border-slate-800 bg-slate-900 flex flex-col">
        <div className="px-4 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="font-semibold text-white text-sm">Job Ads</h2>
          <div className="flex gap-1">
            <button
              onClick={handleAddJob}
              className="btn-icon" title="New job"
            >
              <AddSvg />
            </button>
            <button
              onClick={() => handleDeleteJob(jobId)}
              disabled={!jobId}
              className="btn-icon disabled:opacity-30" title="Delete job"
            >
              <DeleteSvg />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-2 flex flex-col gap-0.5">
          {jobList.length === 0 && (
            <p className="text-slate-600 text-xs text-center py-8">No jobs yet. Click + to create one.</p>
          )}
          {jobList.map((job) => (
            <button
              key={job.id}
              onClick={() => handlePreview(job.id, job.numberOfAds)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors truncate
                ${jobId === job.id
                  ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
            >
              {job.title.length > 24 ? job.title.slice(0, 24) + "…" : job.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* Right panel */}
      <div className="flex-1 flex overflow-hidden">
        {jobVisible ? (
          <>
            <JobEdit
              key={jobId}
              jobId={jobId}
              handleJobCRUDSuccess={handleJobCRUDSuccess}
              setIsChange={setIsChange}
              setJobVisible={setJobVisible}
              handleAdCRUDSuccess={handleAdCRUDSuccess}
            />
            {adsExist && (
              <Ad
                jobId={jobId}
                refreshAdTabs={refreshAdTabs}
                handleAdCRUDSuccess={handleAdCRUDSuccess}
              />
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">📄</div>
              <p className="text-slate-500 text-sm">Select a job from the list</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
