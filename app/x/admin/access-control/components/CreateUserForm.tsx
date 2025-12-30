import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const createUserFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  role: z.enum(["USER", "MODERATOR", "ADMIN"]),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

type Props = {
  onClose?: () => void;
  onSubmit?: (data: CreateUserFormData) => Promise<void> | void;
};

function CreateUserForm({ onClose, onSubmit }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "USER",
    },
  });

  const onFormSubmit = useCallback(async (data: CreateUserFormData) => {
    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(data);
      }
      reset();
      onClose?.();
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false);
    }
  }, [onSubmit, reset, onClose]);

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="text-[#1A1D23] min-w-[48.7rem] w-full"
    >
      <header className="flex justify-between w-full mx-auto mb-10">
        <div>
          <h2 className="text-[2.134rem] font-bold">Add New User</h2>
          <p className="text-[1.138rem] text-[#505662]">
            Create a new user account for the platform
          </p>
        </div>
        <button type="button" onClick={onClose} disabled={isLoading}>
          <X />
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6 w-full  mx-auto">
        <div className="grid gap-4">
          <div>
            <label htmlFor="name" className="block text-[1.6rem]">
              Full Name *
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              className="border border-[#B6BCC9] p-6 text-[1.2rem] w-full"
              placeholder="e.g., John Doe"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-red-500 text-[1.1rem] mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-[1.6rem]">
              Email Address *
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="border border-[#B6BCC9] p-6 text-[1.2rem] w-full"
              placeholder="e.g., john.doe@example.com"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-[1.1rem] mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-4">
          <div>
            <label htmlFor="role" className="block text-[1.6rem]">
              Role *
            </label>
            <select
              {...register("role")}
              id="role"
              className="border border-[#B6BCC9] p-6 text-[1.2rem] w-full"
              disabled={isLoading}
            >
              <option value="USER">User</option>
              <option value="MODERATOR">Moderator</option>
              <option value="ADMIN">Administrator</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-[1.1rem] mt-1">
                {errors.role.message}
              </p>
            )}
          </div>

        </div>
      </div>

      <footer className="flex items-end justify-end gap-4 w-full mt-8">
        <Button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="text-[1.8rem] text-black border border-[#E3E3E3] bg-white! rounded-2xl px-8"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={isLoading}
          className="text-[1.8rem] border border-[#E3E3E3] bg-[#03624C]! rounded-2xl px-8"
        >
          Create User
        </Button>
      </footer>
    </form>
  );
}

export default CreateUserForm;
