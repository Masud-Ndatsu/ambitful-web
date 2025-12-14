import Footer from "@/components/Footer";
import { Header } from "../../components/Header";
import BlogList from "./components/BlogList";

export default function BlogsPage() {
  return (
    <main className="p-8 text-[2rem]">
      <Header
        title="Insights & Stories"
        description="Stay updated with the latest trends in AI, career development, and the future of work."
      />

      <BlogList />
      <Footer />
    </main>
  );
}
