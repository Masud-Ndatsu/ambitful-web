import { toast as toastify } from "react-toastify";

interface ToastOptions {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

export function useToast() {
  const toast = ({ title, description, variant = "default" }: ToastOptions) => {
    const message = description ? `${title}: ${description}` : title;

    if (variant === "destructive") {
      toastify.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toastify.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return { toast };
}

