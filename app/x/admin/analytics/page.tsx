import AdminLayout from "../../components/AdminLayout";

export default function AdminAnalyticsPage() {
  return (
    <AdminLayout>
      <section className="p-8">
        <h1 className="text-3xl font-bold">Admin — Analytics</h1>
        <p className="mt-4 text-muted-foreground">
          Usage metrics, charts, and reports.
        </p>
      </section>
    </AdminLayout>
  );
}
