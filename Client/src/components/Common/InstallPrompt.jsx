import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // stop automatic browser prompt
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      console.log("User accepted the A2HS prompt");
    }
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-xs items-start gap-4 rounded-md bg-white p-4 shadow-lg">
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-900">Install Study Hub</p>
        <p className="text-sm text-gray-600">
          Install our app to access all the features!
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <button
          className="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
          onClick={handleInstallClick}
        >
          Install
        </button>
        <button
          className="text-gray-400 hover:text-gray-800 text-sm"
          onClick={() => setShowPrompt(false)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
