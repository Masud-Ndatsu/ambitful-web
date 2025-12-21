import AdminLayout from "../../components/AdminLayout";

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold">Admin — Settings</h1>
        <p className="mt-4 text-muted-foreground">
          Application and admin configuration.
        </p>
      </div>
    </AdminLayout>
  );
}
