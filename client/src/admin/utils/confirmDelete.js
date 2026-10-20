import Swal from "sweetalert2";

const confirmDelete = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    reverseButtons: true,
    buttonsStyling: false,

    customClass: {
      popup: "bg-surface! text-primary! border border-border! rounded-2xl!",
      title: "text-primary! text-xl! font-bold!",
      htmlContainer: "text-secondary! text-sm!",
      icon: "!border-amber-500 !text-amber-500",
      actions: "gap-3!",
      confirmButton:
        "rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600",
      cancelButton:
        "rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-background",
    },
  });

  return result.isConfirmed;
};

export default confirmDelete;
