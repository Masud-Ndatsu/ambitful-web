import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";

type Props = {
  handleCreateOpportunity?: () => void;
};

const CreateOpportunityForm = ({}: Props) => {
  return (
    <form className="text-[#1A1D23] min-w-[81.1rem] w-full h-[69.3rem]">
      <header className="flex justify-between">
        <div>
          <h2 className="text-[2.134rem] font-bold">Add New Opportunity</h2>
          <p className="text-[1.138rem] text-[#505662]">
            Create a new opportunity for your platform
          </p>
        </div>
        <button>
          <X />
        </button>
      </header>
      <section className="mt-20">
        <div className="grid grid-cols-2 gap-4 w-full max-w-[75.1rem] mx-auto">
          <div>
            <label htmlFor="title" className="block text-[1.6rem]">
              Title *{" "}
            </label>
            <input
              type="text"
              name="title"
              className="border border-[#B6BCC9] p-6 text-[1.2rem] w-full"
              placeholder="e.g., Software Engineering Intermship"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-[1.6rem]">
              Category *{" "}
            </label>
            <input
              type="text"
              name="category"
              className="border border-[#B6BCC9] p-6 text-[1.2rem] w-full"
              placeholder="e.g., Software Engineering Intermship"
            />
          </div>
        </div>
        <div className="max-w-[75.1rem] w-full mx-auto mt-8">
          <label htmlFor="description" className="block text-[1.6rem]">
            Description *
          </label>
          <textarea
            name="description"
            id="description"
            className="border border-[#B6BCC9] text-[1.2rem] w-full h-[18.7rem] p-6 resize-none"
          ></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full max-w-[75.1rem] mx-auto mt-8">
          <div>
            <label htmlFor="date" className="block text-[1.6rem]">
              Deadline{" "}
            </label>
            <input
              type="text"
              name="date"
              className="border border-[#B6BCC9] p-6 text-[1.2rem] w-full"
              placeholder="dd/mm/yyy"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-[1.6rem]">
              Link{" "}
            </label>
            <input
              type="text"
              name="category"
              className="border border-[#B6BCC9] p-6 text-[1.2rem] w-full"
              placeholder="https://..."
            />
          </div>
        </div>
        <div className="w-full max-w-[75.1rem] mx-auto mt-8">
          <label htmlFor="title" className="block text-[1.6rem]">
            Tags{" "}
          </label>
          <input
            type="text"
            name="title"
            className="border border-[#B6BCC9] p-6 text-[1.2rem] w-full"
            placeholder="e.g., remote, internship, full time"
          />
        </div>
      </section>
      <footer className="flex items-end justify-end gap-4 w-full max-w-[75.1rem] mx-auto mt-8">
        <Button className="text-[1.8rem] text-black border border-[#E3E3E3] bg-white! rounded-2xl">
          Cancel
        </Button>
        <Button className="text-[1.8rem] border border-[#E3E3E3] bg-[#03624C]! rounded-2xl">
          Create Opportunity
        </Button>
      </footer>
    </form>
  );
};

export default CreateOpportunityForm;
