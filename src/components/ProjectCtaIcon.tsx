import { Workflow, Cpu, BookOpen, Binary, ArrowRight, Terminal } from "lucide-react";

interface Props {
  projectId: string;
  className?: string;
}

export default function ProjectCtaIcon({ projectId, className = "w-4 h-4" }: Props) {
  switch (projectId) {
    case "warranty-rma":
    case "cytron-rma":
      return (
        <Workflow
          className={`${className} transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110`}
        />
      );
    case "raspberry-pi-diagnostics":
      return (
        <Cpu
          className={`${className} transition-transform duration-200 group-hover:scale-110`}
        />
      );
    case "iot-fertiliser-mixing":
      return (
        <BookOpen
          className={`${className} transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
        />
      );
    case "rog-gaming-center":
      return (
        <Terminal
          className={`${className} transition-transform duration-200 group-hover:scale-110`}
        />
      );
    case "opencore-efi-hackintosh":
    case "opencore-efi-gl503ge":
    case "asus-rog-hackintosh":
    case "hackintosh-gl503ge":
      return (
        <Binary
          className={`${className} transition-transform duration-200 group-hover:scale-110`}
        />
      );
    default:
      return (
        <ArrowRight
          className={`${className} transition-transform duration-200 group-hover:translate-x-1`}
        />
      );
  }
}
