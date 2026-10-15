import { MacbookPro } from "@/components/ui/macbook-pro";
import RagPipelineDiagram from "./RagPipelineDiagram";

/**
 * Set to the screenshot path once it is uploaded, e.g. "/images/hr-assistive-intelligence.png"
 * (16:10, sanitised: no real HR document content). While null, the MacBook shows the
 * architecture diagram instead.
 */
const HR_SCREENSHOT_SRC: string | null = null;

export default function HrAssistiveMacbook({ className, priority }: { className?: string; priority?: boolean }) {
  if (HR_SCREENSHOT_SRC) {
    return <MacbookPro src={HR_SCREENSHOT_SRC} fit="fill" showNotch={false} priority={priority} className={className} />;
  }

  return (
    <MacbookPro showNotch={false} className={className}>
      <div className="w-full h-full bg-[#0E0E11] p-2">
        <RagPipelineDiagram />
      </div>
    </MacbookPro>
  );
}
