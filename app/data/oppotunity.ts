import { Opportunity } from "@/app/types";

export const opportunities: Opportunity[] = [
  {
    id: "1",
    category: "Scholarship",
    title: "Global Leadership Scholarship",
    description:
      "Full tuition scholarship for undergraduate students demonstrating exceptional leadership potential.",
    deadline: "Dec 31, 2025",
    locations: ["Global"],
    company: "Global Education Foundation",
    type: "internship",
    remote: true,
  },
  {
    id: "2",
    category: "Fellowship",
    title: "Tech Innovation Fellowship",
    description:
      "One-year fellowship program for emerging tech innovators with mentorship and funding.",
    deadline: "Jan 15, 2026",
    locations: ["United States"],
    company: "TechStart Institute",
    salary: "$75,000",
    type: "full-time",
    remote: false,
  },
  {
    id: "3",
    category: "Internship",
    title: "Software Engineering Internship",
    description:
      "Summer internship at a leading tech company with competitive compensation.",
    deadline: "Nov 30, 2025",
    locations: ["Remote"],
    company: "TechCorp Inc",
    salary: "$8,000/month",
    type: "internship",
    remote: true,
  },
  {
    id: "4",
    category: "Grant",
    title: "Research Grant Program",
    description:
      "Funding for innovative research projects in STEM fields up to $50,000.",
    deadline: "Feb 28, 2026",
    locations: ["Europe"],
    company: "European Research Council",
    type: "contract",
    remote: true,
  },
  {
    id: "5",
    category: "Competition",
    title: "Young Entrepreneur Award",
    description: "$100,000 business competition for student entrepreneurs.",
    deadline: "Oct 31, 2025",
    locations: ["Asia Pacific"],
    company: "Startup Asia",
    type: "contract",
    remote: false,
  },
  {
    id: "6",
    category: "Exchange",
    title: "International Exchange Program",
    description:
      "Cultural exchange program with full funding for travel and accommodation.",
    deadline: "Mar 15, 2026",
    locations: ["Multiple Countries"],
    company: "Cultural Exchange Network",
    type: "part-time",
    remote: false,
  },
];
