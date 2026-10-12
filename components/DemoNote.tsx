import type { ReactNode } from "react";

/**
 * A small, honest label for example content. Shown wherever demo data appears, so nobody
 * mistakes it for confirmed information. Remove by setting the DEMO flags to false.
 */
export default function DemoNote({ children }: { children?: ReactNode }) {
  return (
    <p className="demo-note" role="note">
      <span className="tbc">Demo content</span>
      <span>
        {children ??
          "Example details for preview only. They will be replaced with the library's confirmed information before launch."}
      </span>
    </p>
  );
}
