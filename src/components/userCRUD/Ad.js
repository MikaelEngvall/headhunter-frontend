import { useEffect, useState } from "react";
import { findAllAdsByJobId } from "./adFunctions/findAllAdsByJobId";
import { deleteAd } from "./adFunctions/deleteAd";
import DeleteSvg from "../utils/icons/delete.svg?react";

export default function Ad({ jobId, refreshAdTabs, handleAdCRUDSuccess }) {
  const [adList, setAdList] = useState([]);
  const [htmlCode, setHtmlCode] = useState("");
  const [adId, setAdId] = useState(0);
  const [activeAd, setActiveAd] = useState(null);

  useEffect(() => {
    if (!adList.length) setHtmlCode("");
  }, [adList.length]);

  useEffect(() => {
    findAllAdsByJobId(jobId, setAdList);
  }, [refreshAdTabs, jobId]);

  useEffect(() => {
    if (adList.length > 0) {
      const last = adList[adList.length - 1];
      setAdId(last.id);
      setActiveAd(adList.length - 1);
      setHtmlCode(last.htmlCode);
    }
  }, [adList]);

  const blob = new Blob([htmlCode], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  function handleDeleteAd(id) {
    if (window.confirm("Delete this ad?")) deleteAd(id, handleAdCRUDSuccess);
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden min-w-[400px]">
      {/* Header + tabs */}
      <div className="px-4 pt-4 pb-0 border-b border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-white text-sm">Ad Preview</h3>
          <button
            onClick={() => handleDeleteAd(adId)}
            className="btn-icon" title="Delete ad"
          >
            <DeleteSvg />
          </button>
        </div>
        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-px">
          {adList.map((ad, i) => (
            <button
              key={ad.id}
              onClick={() => { setHtmlCode(ad.htmlCode); setActiveAd(i); setAdId(ad.id); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-t-md border-b-2 whitespace-nowrap transition-colors
                ${activeAd === i
                  ? "border-indigo-500 text-indigo-300 bg-indigo-500/10"
                  : "border-transparent text-slate-500 hover:text-slate-300"
                }`}
            >
              Version {i + 1}
            </button>
          ))}
          {adList.length === 0 && (
            <span className="text-slate-600 text-xs py-1.5">No ads generated yet</span>
          )}
        </div>
      </div>

      {/* iFrame */}
      <div className="flex-1 p-4 overflow-hidden">
        <iframe
          src={url}
          title="Ad Content"
          className="w-full h-full rounded-lg border border-slate-700 bg-white"
          style={{ minHeight: "500px" }}
        />
      </div>
    </div>
  );
}
