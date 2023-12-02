"use client";

import { Users } from "@/app/lib/interface/users-interface";
import Delete from "@/assets/svg/delete";
import Edit from "@/assets/svg/edit";
import React, { useState } from "react";
import Modal from "./ui/modal";

const UserPanel = ({ users }: { users: Users[] }) => {
  const [modelOpen, setModalOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<Users[]>(users);
  const [rowToEdit, setRowToEdit] = useState<number | null>(null);

  console.log(userData);

  // Modal logic!
  const modalOpenHandeler = () => setModalOpen(true);
  const modalCloseHandeler = () => {
    setModalOpen(false);
    setRowToEdit(null);
  };

  // Delete Rows!
  const handleDeleteRows = (targetIdx: number) => {
    setUserData(userData.filter(({ id }) => parseInt(id) !== targetIdx));
    // setUserData((prevUsers) => {
    //   const newUsers = prevUsers.filter(({ id }) => parseInt(id) !== targetIdx);
    //   return newUsers;
    // });
  };

  // Edit Rows!
  const handleEditRow = (idx: number) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = (newRowData: Users) => {
    setUserData(
      userData.map(({ id, name, role, email }) => {
        if (parseInt(id) !== rowToEdit)
          return {
            name,
            id,
            email,
            role,
          };

        return newRowData;
      })
    );
  };

  return (
    <section className="w-full mt-8">
      {/* Adding Editing Modal here! */}
      {modelOpen && (
        <Modal
          closeModal={modalCloseHandeler}
          defaultValue={userData[rowToEdit!]}
          onSubmit={handleSubmit}
        />
      )}

      {/* Add filter here */}
      <div className="w-full rounded-[7px] my-4 border border-[var(--muted-border)] text-sm">
        <table className="w-full">
          <thead className="[&_tr]:border-b border-[var(--muted-border)]">
            <tr className="flex flex-row">
              <th className="table-header flex-[1] py-3 pl-10">Name</th>
              <th className="table-header flex-[2] py-3 pl-36">Email</th>
              <th className="table-header flex-[1] py-3 pl-20">Role</th>
              <th className="table-header flex-[1] py-3 pl-20">Actions</th>
            </tr>
          </thead>

          <tbody className="[&_tr]:border-b border-[var(--muted-border)]">
            {userData.map(({ id, name, email, role }) => (
              <tr
                key={id}
                className="flex flex-row justify-evenly items-center transition-colors hover:bg-[var(--muted-faded)]"
              >
                <td className="table-body flex-[1] py-3 pl-10">{name}</td>
                <td className="table-body flex-[2] py-3 pl-36">{email}</td>
                <td className="table-body flex-[1] py-3 pl-20">{role}</td>
                <td className="table-body flex-[1] py-3 pl-20">
                  <div className="flex flex-row space-x-3 items-center">
                    <button
                      onClick={() => handleEditRow(parseInt(id))}
                      className="p-[6px] rounded-lg transition-colors hover:bg-gray-200/50"
                    >
                      <Edit />
                    </button>
                    <button
                      onClick={() => handleDeleteRows(parseInt(id))}
                      className="p-[6px] rounded-lg transition-colors hover:bg-red-200/80"
                    >
                      <Delete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add pagination here */}
    </section>
  );
};

export default UserPanel;
