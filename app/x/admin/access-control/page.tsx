import AdminLayout from "../../components/AdminLayout";

export default function AdminAccessControlPage() {
  return (
    <AdminLayout>
      <section className="p-8">
        <h1 className="text-3xl font-bold">Admin — Access Control</h1>
        <p className="mt-4 text-muted-foreground">
          Manage roles, permissions, and access settings.
        </p>
      </section>
    </AdminLayout>
  );
}
