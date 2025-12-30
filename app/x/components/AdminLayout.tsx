import React from "react";
import { AdminTopBar } from "./AdminTopBar";

type Props = {
  children: React.ReactNode;
};

function AdminLayout({ children }: Props) {
  return (
    <main className="text-[#0F1729]">
      <AdminTopBar />
      <section>{children}</section>
    </main>
  );
}

export default AdminLayout;
