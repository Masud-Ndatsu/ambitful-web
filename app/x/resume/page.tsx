"use client";
import React, { useMemo, useState } from "react";
import { TopBar } from "../components/TopBar";
import { Button } from "@/components/ui/button";
import { Plus, Upload, FileText, Download, Trash2 } from "lucide-react";
import { DataTable } from "../components/DataTable";
import { resumeColumns } from "./column";
import { useAuth } from "@/hooks/useAuthentication";
import { useToast } from "@/hooks/use-toast";
import { Modal } from "@/components/Modal";

export default function ResumePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const columns = useMemo(() => resumeColumns, []);

  // Mock resume data - replace with actual API call
  const mockResumes = [
    {
      id: "1",
      resume: "Software_Engineer_Resume.pdf",
      jobTitle: "Software Engineer",
      modifiedDate: "2024-01-15",
      dateCreated: "2024-01-10",
    },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      // TODO: Implement resume upload API call
      console.log("Uploading resume:", selectedFile.name);

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Resume Uploaded",
        description: "Your resume has been uploaded successfully.",
      });

      setShowUploadModal(false);
      setSelectedFile(null);
    } catch {
      toast({
        title: "Upload Failed",
        description: "Failed to upload resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9FC]">
      <TopBar />
      <section className="p-8">
        {/* Header */}
        <header className="bg-white border border-[#E3E3E3] rounded-t-2xl p-8 flex items-center justify-between">
          <div>
            <h1 className="text-[2.4rem] font-degular font-semibold text-[#0F1729]">
              My Resumes
            </h1>
            <p className="text-[1.4rem] text-[#505662] mt-1">
              Manage your resumes and cover letters
            </p>
          </div>
          <Button
            onClick={() => setShowUploadModal(true)}
            className="bg-[#03624C] border border-[#E3E3E3] text-[1.6rem] font-semibold text-white rounded-2xl gap-4 px-6 py-3"
          >
            <Plus className="h-5 w-5" />
            Upload Resume
          </Button>
        </header>

        {/* Current Resume Section */}
        {user && (user as any).resumeUrl && (
          <div className="bg-white border-x border-[#E3E3E3] p-8">
            <h2 className="text-[1.8rem] font-semibold text-[#0F1729] mb-4">
              Current Resume
            </h2>
            <div className="flex items-center justify-between p-6 bg-[#F8F9FC] rounded-xl border border-[#E3E3E3]">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-[#03624C] rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-[1.6rem] font-medium text-[#0F1729]">
                    {(user as any).resumeUrl.split("/").pop() ||
                      "Current_Resume.pdf"}
                  </p>
                  <p className="text-[1.3rem] text-[#505662]">
                    Uploaded on{" "}
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="text-[1.4rem] bg-white text-[#505662]! px-4 py-2 rounded-lg"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  className="text-[1.4rem] px-4 py-2 rounded-lg text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Resume History Table */}
        <section className="border-x border-b border-[#E3E3E3] rounded-b-2xl bg-white">
          <div className="p-8">
            <h2 className="text-[1.8rem] font-semibold text-[#0F1729] mb-4">
              Resume History
            </h2>
            <DataTable columns={columns} data={mockResumes} isLoading={false} />
          </div>
        </section>

        {/* Upload Tips */}
        <div className="mt-8 bg-white border border-[#E3E3E3] rounded-2xl p-6">
          <h3 className="text-[1.6rem] font-semibold text-[#0F1729] mb-3">
            📝 Resume Tips
          </h3>
          <ul className="space-y-2 text-[1.4rem] text-[#505662]">
            <li>• Keep your resume updated with your latest experience</li>
            <li>• Use PDF format for best compatibility</li>
            <li>• Tailor your resume for each opportunity type</li>
            <li>• Include relevant keywords from job descriptions</li>
            <li>• Keep it concise - ideally 1-2 pages</li>
          </ul>
        </div>
      </section>

      {/* Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => {
          setShowUploadModal(false);
          setSelectedFile(null);
        }}
      >
        <div className="p-8 min-w-200">
          <h2 className="text-[2.4rem] font-degular font-semibold text-[#0F1729] mb-6">
            Upload Resume
          </h2>

          <div className="space-y-6">
            {/* File Upload Area */}
            <div className="border-2 border-dashed border-[#E3E3E3] rounded-xl p-12 text-center hover:border-[#03624C] transition-colors">
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-16 w-16 text-[#505662] mb-4" />
                <p className="text-[1.6rem] font-medium text-[#0F1729] mb-2">
                  {selectedFile
                    ? selectedFile.name
                    : "Click to upload or drag and drop"}
                </p>
                <p className="text-[1.4rem] text-[#505662]">
                  PDF, DOC, or DOCX (max 5MB)
                </p>
              </label>
            </div>

            {/* Job Title Input */}
            <div>
              <label className="block text-[1.6rem] font-medium text-[#0F1729] mb-2">
                Job Title (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., Software Engineer"
                className="w-full px-4 py-3 border border-[#E3E3E3] rounded-xl text-[1.6rem] focus:outline-none focus:border-[#03624C]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFile(null);
                }}
                className="bg-white! text-[#505662]! text-[1.6rem] px-8 py-3 rounded-xl border border-[#E3E3E3] hover:bg-[#F8F9FC]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                loading={isUploading}
                disabled={!selectedFile}
                className="bg-[#03624C] text-white text-[1.6rem] px-8 py-3 rounded-xl disabled:opacity-50"
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </main>
  );
}
