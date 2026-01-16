"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown, User, Search, Filter } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { useState, useCallback } from "react";
import { userColumns } from "./column";
import { useUsers, useCreateUser } from "@/hooks/useUsers";
import { Modal } from "@/components/Modal";
import CreateUserForm from "./components/CreateUserForm";

export default function AdminAccessControlPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<
    "ADMIN" | "MODERATOR" | "USER" | "all"
  >("all");
  const [selectedStatus, setSelectedStatus] = useState<
    "active" | "inactive" | "all"
  >("all");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const {
    data: usersResponse,
    isLoading,
    error,
  } = useUsers({
    search: searchQuery || undefined,
    role: selectedRole !== "all" ? selectedRole : undefined,
    isEmailVerified:
      selectedStatus === "active"
        ? true
        : selectedStatus === "inactive"
        ? false
        : undefined,
  });

  const users = usersResponse?.users || [];
  const createUserMutation = useCreateUser();

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleRoleFilter = useCallback(
    (role: "ADMIN" | "MODERATOR" | "USER" | "all") => {
      setSelectedRole(role);
      setShowRoleDropdown(false);
    },
    []
  );

  const handleStatusFilter = useCallback(
    (status: "active" | "inactive" | "all") => {
      setSelectedStatus(status);
      setShowStatusDropdown(false);
    },
    []
  );

  const handleCreateUser = useCallback(
    async (data: any) => {
      await createUserMutation.mutateAsync({
        ...data,
        password: "tempPassword123", // TODO: Generate or prompt for password
      });
      setShowAddUserModal(false);
    },
    [createUserMutation]
  );

  const filteredUsers = users;

  const roleDisplayText =
    selectedRole === "all"
      ? "All Roles"
      : selectedRole === "ADMIN"
      ? "Administrator"
      : selectedRole === "MODERATOR"
      ? "Moderator"
      : "User";

  return (
    <div className="h-full flex flex-col overflow-y-scroll">
      <section className="p-8 pb-20 text-[#0F1729]">
        <header className="flex items-center justify-between">
          <div className="flex gap-6 items-center">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                className="py-[1.4rem] pl-12 pr-8 border border-[#E3E3E3] bg-[#FFFFFF] rounded-[0.6rem] text-[1.4rem] lg:min-w-[44.8rem]"
                placeholder="Search by names or email..."
              />
            </div>

            <div className="relative">
              <Button
                variant={"outline"}
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="bg-white py-[1.4rem] px-8 text-[1.4rem] rounded-2xl"
              >
                {roleDisplayText}
                <ChevronDown className="w-8! h-8!" />
              </Button>

              {showRoleDropdown && (
                <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[150px]">
                  <button
                    onClick={() => handleRoleFilter("all")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-[1.4rem]"
                  >
                    All Roles
                  </button>
                  <button
                    onClick={() => handleRoleFilter("ADMIN")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-[1.4rem]"
                  >
                    Administrator
                  </button>
                  <button
                    onClick={() => handleRoleFilter("MODERATOR")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-[1.4rem]"
                  >
                    Moderator
                  </button>
                  <button
                    onClick={() => handleRoleFilter("USER")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-[1.4rem]"
                  >
                    User
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <Button
                variant={"outline"}
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="bg-white py-[1.4rem] px-8 text-[1.4rem] rounded-2xl"
              >
                <Filter className="w-5 h-5 mr-2" />
                {selectedStatus === "all" ? "All Status" : selectedStatus}
                <ChevronDown className="w-8! h-8!" />
              </Button>

              {showStatusDropdown && (
                <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[150px]">
                  <button
                    onClick={() => handleStatusFilter("all")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-[1.4rem]"
                  >
                    All Status
                  </button>
                  <button
                    onClick={() => handleStatusFilter("active")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-[1.4rem]"
                  >
                    Active
                  </button>
                  <button
                    onClick={() => handleStatusFilter("inactive")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-[1.4rem]"
                  >
                    Inactive
                  </button>
                </div>
              )}
            </div>
          </div>

          <Button
            onClick={() => setShowAddUserModal(true)}
            className="bg-primary py-[1.4rem] px-8 text-[1.8rem] rounded-2xl"
          >
            <User className="w-8! h-8!" />
            Add User
          </Button>
        </header>

        <section className="mt-12">
          {error ? (
            <div className="text-center py-8">
              <div className="text-[1.4rem] text-red-600">
                Error loading users
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4 text-[1.4rem] text-gray-600">
                Showing {filteredUsers.length} of{" "}
                {usersResponse?.pagination.total || 0} users
              </div>
              <DataTable
                columns={userColumns}
                data={filteredUsers}
                isLoading={isLoading}
              />
            </>
          )}
        </section>
        <Modal
          isOpen={showAddUserModal}
          onClose={() => setShowAddUserModal(!showAddUserModal)}
        >
          <CreateUserForm
            onClose={() => setShowAddUserModal(!showAddUserModal)}
            onSubmit={handleCreateUser}
          />
        </Modal>
      </section>
    </div>
  );
}
