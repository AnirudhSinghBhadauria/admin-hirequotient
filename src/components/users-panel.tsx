"use client";

import Delete from "@/assets/svg/delete";
import Edit from "@/assets/svg/edit";
import React, { useState } from "react";
import Modal from "./ui/modal";
import { Users } from "@/lib/interface/users-interface";
import PageChange from "@/assets/svg/page-change";
import LastPage from "@/assets/svg/last-page";
import Image from "next/image";
import { getImage } from "@/assets/images/img";

const UserPanel = ({ users }: { users: Users[] }) => {
  const [modelOpen, setModalOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<Users[]>(
    users.map((properties) => ({ ...properties, picture: getImage() }))
  );
  const [rowToEdit, setRowToEdit] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  // Modal logic!
  const modalCloseHandeler = () => {
    setModalOpen(false);
    setRowToEdit(null);
  };

  // Delete Rows!
  const handleDeleteRows = (targetIdx: string) => {
    setUserData((prevUsers) => {
      const newUsers = prevUsers.filter(({ id }) => id !== targetIdx);
      return newUsers;
    });
  };

  // Edit Rows!
  const handleEditRow = (idx: string) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  // Handle Submit!
  const handleSubmit = (newRowData: Users) => {
    setUserData((prevUserData) => {
      const newUserData = prevUserData.map(
        ({ id, name, role, email, picture }) => {
          if (id !== rowToEdit) return { name, id, email, role, picture };

          return newRowData;
        }
      );

      return newUserData;
    });
  };

  // Pagination!
  const usersPerPage = 10;
  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;

  // Filtering Users using name, email and role!
  let filteredUsers = userData.filter(
    ({ name, email, role }) =>
      name.toLowerCase().includes(query.toLowerCase()) ||
      email.toLowerCase().includes(query.toLowerCase()) ||
      role.toLowerCase().includes(query.toLowerCase())
  );

  const numberOfPages = Math.ceil(filteredUsers.length / usersPerPage);
  let usersforCurrentPage = filteredUsers.slice(firstIndex, lastIndex);

  const pageNumbers = [...Array(numberOfPages + 1).keys()].slice(1);

  // Page Navigation
  const goToNextPage = () => setCurrentPage(currentPage + 1);
  const goToPrevPage = () => setCurrentPage(currentPage - 1);
  const goToPage = (index: number) => setCurrentPage(index + 1);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(numberOfPages);

  if (!usersforCurrentPage.length) {
    setQuery("");
    goToFirstPage();
  }

  // if all users on any page are delelted, we go to the previous page!
  currentPage > numberOfPages && goToPrevPage();

  console.log(userData);

  return (
    <section className="w-full mt-8">
      {/* Adding Editing Modal here! */}
      {modelOpen && (
        <Modal
          closeModal={modalCloseHandeler}
          defaultValue={userData.filter(({ id }) => id === rowToEdit!)[0]}
          onSubmit={handleSubmit}
        />
      )}
      {/* Adding filter here */}
      <input
        className="panel-input"
        type="text"
        placeholder="Search users..."
        onChange={(event) => setQuery(event.target.value)}
      />

      {/* Adding Panel Here */}
      <div className="w-full rounded-[7px] my-4 border border-[var(--muted-border)] text-sm">
        <table className="w-full">
          <thead className="[&_tr]:border-b border-[var(--muted-border)]">
            <tr className="flex flex-row">
              <th className="table-header flex-[1] py-3 pl-10">Profile</th>
              <th className="table-header flex-[1] py-3 pl-10">Name</th>
              <th className="table-header flex-[2] py-3 pl-36">Email</th>
              <th className="table-header flex-[1] py-3 pl-20">Role</th>
              <th className="table-header flex-[1] py-3 pl-20">Actions</th>
            </tr>
          </thead>

          <tbody className="[&_tr]:border-b border-[var(--muted-border)]">
            {(usersforCurrentPage.map(({ id, name, email, role, picture }) => {
              return (
                <tr
                  key={id}
                  className="flex flex-row justify-evenly items-center transition-colors hover:bg-[var(--muted-faded)]"
                >
                  <td className="table-body flex-[1] py-3 pl-10">
                    <Image
                      src={picture}
                      alt="display-picture"
                      width="40"
                      height="40"
                      priority
                      className="rounded-full"
                    />
                  </td>
                  <td className="table-body flex-[1] py-3 pl-10">{name}</td>
                  <td className="table-body flex-[2] py-3 pl-36">{email}</td>
                  <td className="table-body flex-[1] py-3 pl-20">{role}</td>
                  <td className="table-body flex-[1] py-3 pl-20">
                    <div className="flex flex-row space-x-3 items-center">
                      <button
                        onClick={() => handleEditRow(id)}
                        className="p-[6px] rounded-lg transition-colors hover:bg-gray-200/50 edit"
                      >
                        <Edit />
                      </button>
                      <button
                        onClick={() => handleDeleteRows(id)}
                        className="p-[6px] rounded-lg transition-colors hover:bg-red-200/80 delete"
                      >
                        <Delete />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            }))}
          </tbody>
        </table>
      </div>

      {/* Add pagination here */}
      <div className="w-full flex flex-row justify-end items-center px-2 mt-6 text-sm font-medium">
        <p className="w-[100px]">
          Page {currentPage} of {numberOfPages}
        </p>

        <nav>
          <ul className="flex items-center space-x-2 ml-8">
            <li>
              <button
                disabled={currentPage === 1}
                onClick={goToFirstPage}
                className="pagination-button rotate-180 first-page"
              >
                <LastPage />
              </button>
            </li>
            <li>
              <button
                disabled={currentPage === 1}
                onClick={goToPrevPage}
                className="pagination-button rotate-180 next-page"
              >
                <PageChange />
              </button>
            </li>
            {pageNumbers.map((number, index) => (
              <li key={index}>
                <button
                  onClick={() => goToPage(index)}
                  className="pagination-button"
                >
                  {number}
                </button>
              </li>
            ))}

            <li>
              <button
                disabled={currentPage === numberOfPages}
                onClick={goToNextPage}
                className="pagination-button previous-page"
              >
                <PageChange />
              </button>
            </li>
            <li>
              <button
                disabled={currentPage === numberOfPages}
                onClick={goToLastPage}
                className="pagination-button last-page"
              >
                <LastPage />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default UserPanel;
