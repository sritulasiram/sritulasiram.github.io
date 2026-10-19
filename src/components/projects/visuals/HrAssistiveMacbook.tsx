import { MacbookPro } from "@/components/mockups/MacbookPro";

const DIR = "/images/projects/cytron-hr-assistive-intelligence";

/**
 * The HR assistant's chat screen on a MacBook, in the visitor's colour scheme. Both screenshots
 * are 16:9; they are padded to the display's own shape (edge pixels extended) so there are no bars.
 */
export default function HrAssistiveMacbook({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <>
      {/* MacbookPro sets an inline display, so the switch lives on `contents` wrappers. */}
      <div className="contents dark:hidden">
        <MacbookPro src={`${DIR}/chat-light.png`} fit="fill" showNotch={false} priority={priority} className={className} />
      </div>
      <div className="hidden dark:contents">
        <MacbookPro src={`${DIR}/chat-dark.png`} fit="fill" showNotch={false} priority={priority} className={className} />
      </div>
    </>
  );
}
