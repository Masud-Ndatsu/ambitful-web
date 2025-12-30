import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const crawlSourceSchema = z.object({
  sourceName: z.string().min(1, "Source name is required"),
  sourceLink: z.string().url("Please enter a valid URL"),
  crawlFrequency: z.enum(["daily", "weekly", "monthly"]),
  cssSelectors: z.string().optional(),
});

type CrawlSourceFormData = z.infer<typeof crawlSourceSchema>;

type Props = {
  onClose?: () => void;
  onSubmit?: (data: CrawlSourceFormData) => Promise<void> | void;
};

const AddCrawlSourceForm = ({ onClose, onSubmit }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CrawlSourceFormData>({
    resolver: zodResolver(crawlSourceSchema),
    defaultValues: {
      sourceName: "",
      sourceLink: "",
      crawlFrequency: "weekly",
      cssSelectors: "",
    },
  });

  const onFormSubmit = useCallback(
    async (data: CrawlSourceFormData) => {
      setIsLoading(true);
      try {
        if (onSubmit) {
          await onSubmit(data);
        }
        reset();
        onClose?.();
      } catch (error) {
        console.error("Error creating crawl source:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [onSubmit, reset, onClose]
  );

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="text-[#1A1D23] min-w-[81.1rem] w-full"
    >
      <header className="flex justify-between w-full max-w-[75.1rem] mx-auto mb-10">
        <div>
          <h2 className="text-[2.134rem] font-bold">Add New Crawl Source</h2>
          <p className="text-[1.138rem] text-[#505662]">
            Add a new source to crawl for opportunities
          </p>
        </div>
        <button type="button" onClick={onClose} disabled={isLoading}>
          <X />
        </button>
      </header>

      <div className="grid grid-cols-1 gap-4 w-full max-w-[75.1rem] mx-auto">
        <div>
          <label htmlFor="sourceName" className="block text-[1.6rem]">
            Source Name *{" "}
          </label>
          <input
            {...register("sourceName")}
            type="text"
            id="sourceName"
            className="border border-[#B6BCC9] p-6 text-[1.2rem] w-full"
            placeholder="e.g., LinkedIn Jobs"
            disabled={isLoading}
          />
          {errors.sourceName && (
            <p className="text-red-500 text-[1.1rem] mt-1">
              {errors.sourceName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="sourceLink" className="block text-[1.6rem]">
            Source Link *{" "}
          </label>
          <input
            {...register("sourceLink")}
            type="url"
            id="sourceLink"
            className="border border-[#B6BCC9] p-6 text-[1.2rem] w-full"
            placeholder="https://www.linkedin.com/jobs/"
            disabled={isLoading}
          />
          {errors.sourceLink && (
            <p className="text-red-500 text-[1.1rem] mt-1">
              {errors.sourceLink.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="crawlFrequency" className="block text-[1.6rem]">
            Crawl Frequency{" "}
          </label>
          <select
            {...register("crawlFrequency")}
            id="crawlFrequency"
            className="border border-[#B6BCC9] p-6 text-[1.2rem] w-full"
            disabled={isLoading}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          {errors.crawlFrequency && (
            <p className="text-red-500 text-[1.1rem] mt-1">
              {errors.crawlFrequency.message}
            </p>
          )}
        </div>
        <div className="max-w-[75.1rem] w-full mx-auto mt-8">
          <label htmlFor="cssSelectors" className="block text-[1.6rem]">
            CSS Selectors (Optional){" "}
          </label>
          <textarea
            {...register("cssSelectors")}
            id="cssSelectors"
            className="border border-[#B6BCC9] text-[1.2rem] w-full h-[18.7rem] p-6 resize-none"
            disabled={isLoading}
          ></textarea>
          {errors.cssSelectors && (
            <p className="text-red-500 text-[1.1rem] mt-1">
              {errors.cssSelectors.message}
            </p>
          )}
        </div>
        <p className="text-[#1A1D2380] text-[1.2rem]">
          Specify CSS selectors to target specific elements on the page
        </p>
      </div>
      <footer className="flex items-end justify-end gap-4 w-full max-w-[75.1rem] mx-auto mt-8">
        <Button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="text-[1.8rem] text-black border border-[#E3E3E3] bg-white! rounded-2xl"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={isLoading}
          className="text-[1.8rem] border border-[#E3E3E3] bg-[#03624C]! rounded-2xl"
        >
          Add Crawl Source
        </Button>
      </footer>
    </form>
  );
};

export default AddCrawlSourceForm;
