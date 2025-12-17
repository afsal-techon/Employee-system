import React, { useEffect, useState } from "react";
import AddButton from "../../components/UI/AddButton";
import { FaBuilding } from "react-icons/fa";
import Table from "../../components/UI/Table";
import Logo from "../../assets/logo.jpg";
import Modal from "../../components/UI/Modal";
import BranchForm from "../../components/BranchForm";
import { branchApi } from "../../services/API";
import { toast } from "react-toastify";
import EditDeleteIcon from "../../components/UI/EditDeleteIcon";

const BranchPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const columns = [
    { key: "no", label: "No." },
    { key: "logo", label: "Logo" },
    { key: "name", label: "Branch Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "actions", label: "Actions" },
  ];

  const fetchBranches = async () => {
    try {
      setIsLoading(true);
      const response = await branchApi.getAllBranches({
        page,
        limit,
        search,
      });
      setBranches(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
     console.log("API HIT WITH:", { page, limit, search });
    fetchBranches();
  }, [page, limit, search]);


  const handleCancel = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
    }
  };

  const handleAddBranch = async (formData) => {
    setIsSubmitting(true);
    try {
      await branchApi.createBranch(formData);
      toast.success("Branch added successfully");
      setIsModalOpen(false);
      fetchBranches();
    } catch (error) {
      toast.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tableData = branches.map((branch, index) => ({
    no: (page - 1) * limit + index + 1,
    logo: (
      <img
        src={branch.logo}
        className="w-10 h-10 rounded-full"
        alt="logo"
      />
    ),
    name: branch.name,
    email: branch.email,
    phone: branch.phone,
    actions:(
      <EditDeleteIcon  onEdit={()=> console.log('edit')} onDelete={()=>console.log('delete')} />
    )
  }));

  return (
    <div className="p-1 md:p-2 lg:p-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Branch Management
        </h2>
        <AddButton
          onClick={() => setIsModalOpen(true)}
          btnHeading="Add Branch"
          logo={<FaBuilding size={20} className="md:size-6" />}
        />
      </div>

      <Table
        title="Branch List"
        columns={columns}
        data={tableData}
        isLoading={isLoading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        itemsPerPage={limit}
        onItemsPerPageChange={setLimit}
        search={search}
        onSearchChange={setSearch}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title="Add Branch"
        size="lg"
      >
        <BranchForm
          onSubmit={handleAddBranch}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
};

export default BranchPage;
