import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Step1Intent from "@/components/builder/Step1Intent";
import Step2Generation from "@/components/builder/Step2Generation";
import Step3IDE from "@/components/builder/Step3IDE";

export default function SiteBuilder() {
  const { siteId } = useParams();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [projectConfig, setProjectConfig] = useState<any>(null);

  // If we have a siteId, we assume it's an existing project and go straight to IDE
  // For now, we'll just mock this behavior. In a real app, we'd fetch the project data.
  React.useEffect(() => {
    if (siteId) {
      setStep(3);
      setProjectConfig({ prompt: "Loaded existing project" });
    }
  }, [siteId]);

  const handleStep1Next = (config: any) => {
    setProjectConfig(config);
    setStep(2);
  };

  const handleStep2Complete = () => {
    setStep(3);
    // In a real app, we might navigate to /builder/:newSiteId here
  };

  const handleStep2Cancel = () => {
    setStep(1);
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-background">
      {step === 1 && <Step1Intent onNext={handleStep1Next} />}
      {step === 2 && <Step2Generation config={projectConfig} onComplete={handleStep2Complete} onCancel={handleStep2Cancel} />}
      {step === 3 && <Step3IDE config={projectConfig} />}
    </div>
  );
}
