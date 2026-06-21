import { useEffect, useState } from "react";
import { updateJob } from "./jobFunctions/updateJob.js";
import { getJobById } from "./jobFunctions/getJobById.js";
import { generateJobAd } from "./jobFunctions/generateJobAd.js";
import HtmlSvg from "../utils/icons/html.svg?react";
import PdfSvg from "../utils/icons/pdf.svg?react";
import DocxSvg from "../utils/icons/docx.svg?react";
import HourglassBottomSvg from "../utils/icons/hourglass-bottom.svg?react";
import UpdateSvg from "../utils/icons/update.svg?react";
import GenerateSvg from "../utils/icons/generate.svg?react";

export default function JobEdit({
  handleJobCRUDSuccess, jobId, setIsChange, setJobVisible, handleAdCRUDSuccess,
}) {
  const [job, setJob] = useState({});
  const [active, setActive] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instruction, setInstruction] = useState("");
  const [documentType, setDocumentType] = useState("html");
  const [activeFormat, setActiveFormat] = useState("1");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getJobById(jobId, setJob, setTitle, setDescription, setInstruction);
    setActiveFormat("1");
  }, [jobId]);

  useEffect(() => {
    setDocumentType(["html", "pdf", "docx"][activeFormat - 1]);
  }, [activeFormat]);

  useEffect(() => {
    setInstruction("Skapa en jobbannons i " + documentType + "-format med professionell CSS. " + DEFAULT_INSTRUCTIONS);
    setDescription(DEFAULT_DESCRIPTION);
  }, [documentType]);

  function handleUpdate() {
    updateJob(jobId, handleJobCRUDSuccess, title, description, instruction, () => {
      setIsChange(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  const formats = [
    { id: "1", label: "HTML", Icon: HtmlSvg },
    { id: "2", label: "PDF",  Icon: PdfSvg },
    { id: "3", label: "DOCX", Icon: DocxSvg },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-slate-950 border-r border-slate-800">
      <div className="p-6 flex flex-col gap-5 max-w-2xl w-full">

        {/* Title */}
        <div>
          <label className="label">Job Title</label>
          <input
            value={title}
            onChange={(e) => { setTitle(e.target.value); setIsChange(true); }}
            className="input-field text-base"
            placeholder="e.g. Senior Frontend Developer"
          />
        </div>

        {/* Format */}
        <div>
          <label className="label">Output Format</label>
          <div className="flex gap-2 mt-1">
            {formats.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveFormat(id)}
                className={`format-btn ${activeFormat === id ? "active" : ""}`}
                title={label}
              >
                <Icon />
              </button>
            ))}
          </div>
        </div>

        {/* Description / Instruction tabs */}
        <div>
          <div className="flex gap-1 mb-3">
            {["Description", "Instructions"].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActive(i + 1)}
                className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                  active === i + 1
                    ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <textarea
            value={active === 1 ? description : instruction}
            onChange={(e) => {
              active === 1 ? setDescription(e.target.value) : setInstruction(e.target.value);
              setIsChange(true);
            }}
            className="code-area"
            rows={12}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleUpdate}
            disabled={isGenerating}
            className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <UpdateSvg className="w-4 h-4 fill-white" />
            {saved ? "Saved ✓" : "Save Job"}
          </button>
          <button
            onClick={() => {
              if (window.confirm("Generate an AI ad? This consumes credits.")) {
                setIsGenerating(true);
                generateJobAd(documentType, jobId, handleAdCRUDSuccess, setIsGenerating);
              }
            }}
            disabled={isGenerating}
            className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <GenerateSvg className="w-4 h-4 fill-slate-300" />
            Generate Ad
          </button>
        </div>

        {/* Generating loader */}
        {isGenerating && (
          <div className="flex items-center gap-3 text-slate-400 text-sm">
            <HourglassBottomSvg className="w-5 h-5 fill-indigo-400 animate-spin" />
            Generating ad, please wait…
          </div>
        )}
      </div>
    </div>
  );
}

const DEFAULT_INSTRUCTIONS = "För att omarbeta en arbetsbeskrivning till en jobbannons, börja med att läsa igenom arbetsbeskrivningen noggrant för att förstå de huvudsakliga arbetsuppgifterna, nödvändiga kompetenser och kvalifikationer.";
const DEFAULT_DESCRIPTION = "Företaget Sprinta utvecklare en applikation för AI-genererade jobbannonser. Frontend är skriven i React och Backend är skriven i Java och Spring Boot.";
