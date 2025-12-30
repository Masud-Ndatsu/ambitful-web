"use client";

import { User } from "@/actions/users";
import { ColumnDef } from "@tanstack/react-table";
import {
  EllipsisVertical,
  User as UserIcon,
  Edit,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";
import { useState } from "react";
import { useDropdownPosition } from "@/hooks/useDropdownPosition";
import { useDeleteUser, useToggleUserStatus } from "@/hooks/useUsers";
import { useConfirmationDialog } from "@/components/ui/confirmation-dialog";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <UserIcon className="w-5 h-5" />
        </div>
        <span className="font-medium">{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as "ADMIN" | "MODERATOR" | "USER";
      const getRoleColor = (role: "ADMIN" | "MODERATOR" | "USER") => {
        switch (role) {
          case "ADMIN":
            return "bg-red-100 text-red-800";
          case "MODERATOR":
            return "bg-blue-100 text-blue-800";
          case "USER":
            return "bg-green-100 text-green-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
      };

      return (
        <span
          className={`px-3 py-1 rounded-full text-[1.2rem] font-medium ${getRoleColor(
            role
          )}`}
        >
          {role === "ADMIN"
            ? "Administrator"
            : role === "MODERATOR"
            ? "Moderator"
            : "User"}
        </span>
      );
    },
  },
  {
    accessorKey: "isEmailVerified",
    header: "Status",
    cell: ({ row }) => {
      const isEmailVerified = row.getValue("isEmailVerified") as boolean;
      const status = isEmailVerified ? "active" : "inactive";
      const getStatusColor = (status: string) => {
        switch (status) {
          case "active":
            return "bg-green-100 text-green-800";
          case "inactive":
            return "bg-gray-100 text-gray-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
      };

      return (
        <span
          className={`px-3 py-1 rounded-full text-[1.2rem] font-medium ${getStatusColor(
            status
          )}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Added",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <UserActionCell user={row.original} />,
  },
];

function UserActionCell({ user }: { user: User }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const deleteUserMutation = useDeleteUser();
  const toggleStatusMutation = useToggleUserStatus();
  const { confirm, dialog } = useConfirmationDialog();

  // Use custom hook to handle dropdown positioning
  const { buttonRef, positionClasses } = useDropdownPosition({
    isOpen: showDropdown,
  });

      const handleEdit = () => {
        console.log("Edit user:", user.id);
        setShowDropdown(false);
      };

      const handleDelete = () => {
        confirm({
          title: "Delete User",
          description: "Are you sure you want to delete this user? This action cannot be undone.",
          onConfirm: () => deleteUserMutation.mutate(user.id),
          confirmText: "Delete",
          variant: "destructive"
        });
        setShowDropdown(false);
      };

      const handleToggleStatus = () => {
        toggleStatusMutation.mutate(user.id);
        setShowDropdown(false);
      };

      return (
        <div className="relative">
          {dialog}
          <button
            ref={buttonRef}
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-[#E3E3E333] h-12 w-12 rounded-full grid place-items-center hover:bg-gray-200"
          >
            <EllipsisVertical />
          </button>

          {showDropdown && (
            <>
              {/* Backdrop to close dropdown when clicked outside */}
              <div
                className="fixed inset-0 z-0"
                onClick={() => setShowDropdown(false)}
              />
              <div
                className={`absolute right-0 ${positionClasses} bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[150px] max-w-[200px]`}
              >
                <button
                  onClick={handleEdit}
                  className="block w-full text-left px-5 py-3 hover:bg-gray-100 text-[1.2rem] whitespace-nowrap"
                >
                  <Edit className="inline h-4 w-4 mr-2" />
                  Edit User
                </button>
                <hr className="border-gray-100" />
                <button
                  onClick={handleToggleStatus}
                  className="block w-full text-left px-5 py-3 hover:bg-gray-100 text-[1.2rem] whitespace-nowrap"
                >
                  {user.isEmailVerified ? (
                    <>
                      <UserX className="inline h-4 w-4 mr-2" />
                      Deactivate User
                    </>
                  ) : (
                    <>
                      <UserCheck className="inline h-4 w-4 mr-2" />
                      Activate User
                    </>
                  )}
                </button>
                <hr className="border-gray-100" />
                <button
                  onClick={handleDelete}
                  className="block w-full text-left px-5 py-3 hover:bg-red-50 text-[1.2rem] text-red-600 whitespace-nowrap"
                >
                  <Trash2 className="inline h-4 w-4 mr-2" />
                  Delete User
                </button>
              </div>
            </>
          )}
        </div>
      );
}

