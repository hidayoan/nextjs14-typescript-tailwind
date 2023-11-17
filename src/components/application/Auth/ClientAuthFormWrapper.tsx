"use client";

import ReduxProvider from "@/app/store/ReduxProvider";

export default function ClientAuthFormWrapper(
  { children }: { children: React.ReactNode }
) {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  );
}