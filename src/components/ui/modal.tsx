import Close from "@/assets/svg/close";
import { Users } from "@/lib/interface/users-interface";
import React, { ChangeEvent, FormEvent, useState } from "react";

const Modal = ({
  closeModal,
  defaultValue,
  onSubmit,
}: {
  closeModal: () => void;
  defaultValue: Users;
  onSubmit: (newRowData: Users) => void;
}) => {
  // Closing modal handeler!
  const modalCloseHandeler = () => closeModal();

  // Form State Handeler!
  const [formData, setFormData] = useState(
    defaultValue || {
      id: "",
      name: "",
      role: "member",
      email: "",
    }
  );

  // could have used Server actions for forms, but since most the app is running on client,
  // server action wouldn't make much of a difference.
  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    onSubmit(formData);
    closeModal();
  };

  return (
    <div className="fixed z-10 left-0 top-0 w-full h-full flex flex-row justify-center items-center blurify">
      <div className="relative bg-white w-[425px] border border-[var(--muted-border)] p-6 shadow-lg rounded-[0.5rem]">
        <div>
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            Edit user
          </h2>
          <p className="text-sm text-[var(--muted-foreground)] mt-[6px]">
            Make changes to user here. Click save when you're done.
          </p>
        </div>

        <form className="grid pt-4 gap-4 mt-[1rem]">
          <div className="grid grid-cols-4 items-center gap-2 text-center">
            <label className="text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              className="modal-form-ring"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-2 text-center">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="modal-form-ring "
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-2 text-center">
            <label className="text-sm font-medium" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="modal-form-ring"
              value={formData.role}
              onChange={handleFormChange} 
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-[1rem] inline-flex items-center justify-end justify-self-end whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[var(--primary)] text-white hover:bg-[#17171c]/90 max-w-fit h-10 px-4 py-2"
          >
            Save changes
          </button>
        </form>

        <button
          onClick={modalCloseHandeler}
          className="absolute top-4 right-4 hover:scale-110 transition-all duration-300 ease-in-out"
        >
          <Close />
        </button>
      </div>
    </div>
  );
};

export default Modal;
