import React, { useState } from "react";
import AddButton from "../../components/UI/AddButton";
import { FaBuilding } from "react-icons/fa";
import Table from "../../components/UI/Table";
import Logo from "../../assets/logo.jpg";
import Modal from "../../components/UI/Modal";
import BranchForm from "../../components/BranchForm";
import { branchApi } from "../../services/API";
import { toast } from "react-toastify";

const BranchPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const columns = [
    { key: "no", label: "No." },
    { key: "logo", label: "Logo" },
    { key: "name", label: "Branch Name" },
    { key: "trn", label: "TRN" },
    { key: "address", label: "Address" },
    { key: "phone", label: "Phone" },
    { key: "landline", label: "Landline" },
    { key: "currency", label: "Currency" },
    { key: "symbol", label: "Currency Symbol" },
  ];

  const data = [
    {
      no: 1,
      logo: <img src={Logo} className="w-10 h-10 rounded-full" />,
      name: "Techon",
      trn: "3483383723",
      address: "Ponand",
      phone: "54534545665",
      landline: "N/A",
      currency: "AED",
      symbol: "AED",
    },
    {
      no: 1,
      logo: <img src={Logo} className="w-10 h-10 rounded-full" />,
      name: "Techon",
      trn: "3483383723",
      address: "Ponand",
      phone: "54534545665",
      landline: "N/A",
      currency: "AED",
      symbol: "AED",
    },
    {
      no: 1,
      logo: <img src={Logo} className="w-10 h-10 rounded-full" />,
      name: "Techon",
      trn: "3483383723",
      address: "Ponand",
      phone: "54534545665",
      landline: "N/A",
      currency: "AED",
      symbol: "AED",
    },
    {
      no: 1,
      logo: <img src={Logo} className="w-10 h-10 rounded-full" />,
      name: "Techon",
      trn: "3483383723",
      address: "Ponand",
      phone: "54534545665",
      landline: "N/A",
      currency: "AED",
      symbol: "AED",
    },
    {
      no: 1,
      logo: <img src={Logo} className="w-10 h-10 rounded-full" />,
      name: "Techon",
      trn: "3483383723",
      address: "Ponand",
      phone: "54534545665",
      landline: "N/A",
      currency: "AED",
      symbol: "AED",
    },
    {
      no: 1,
      logo: <img src={Logo} className="w-10 h-10 rounded-full" />,
      name: "Techon",
      trn: "3483383723",
      address: "Ponand",
      phone: "54534545665",
      landline: "N/A",
      currency: "AED",
      symbol: "AED",
    },
    {
      no: 1,
      logo: <img src={Logo} className="w-10 h-10 rounded-full" />,
      name: "Techon",
      trn: "3483383723",
      address: "Ponand",
      phone: "54534545665",
      landline: "N/A",
      currency: "AED",
      symbol: "AED",
    },
    {
      no: 1,
      logo: <img src={Logo} className="w-10 h-10 rounded-full" />,
      name: "Techon",
      trn: "3483383723",
      address: "Ponand",
      phone: "54534545665",
      landline: "N/A",
      currency: "AED",
      symbol: "AED",
    },
    {
      no: 1,
      logo: <img src={Logo} className="w-10 h-10 rounded-full" />,
      name: "Techon",
      trn: "3483383723",
      address: "Ponand",
      phone: "54534545665",
      landline: "N/A",
      currency: "AED",
      symbol: "AED",
    },
    {
      no: 1,
      logo: <img src={Logo} className="w-10 h-10 rounded-full" />,
      name: "Techon",
      trn: "3483383723",
      address: "Ponand",
      phone: "54534545665",
      landline: "N/A",
      currency: "AED",
      symbol: "AED",
    },
    {
      no: 1,
      logo: <img src={Logo} className="w-10 h-10 rounded-full" />,
      name: "Techon",
      trn: "3483383723",
      address: "Ponand",
      phone: "54534545665",
      landline: "N/A",
      currency: "AED",
      symbol: "AED",
    },
    {
      no: 1,
      logo: <img src={Logo} className="w-10 h-10 rounded-full" />,
      name: "Techon",
      trn: "3483383723",
      address: "Ponand",
      phone: "54534545665",
      landline: "N/A",
      currency: "AED",
      symbol: "AED",
    },
    {
      no: 1,
      logo: <img src={Logo} className="w-10 h-10 rounded-full" />,
      name: "Techon",
      trn: "3483383723",
      address: "Ponand",
      phone: "54534545665",
      landline: "N/A",
      currency: "AED",
      symbol: "AED",
    },
  ];

  const handleCancel = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
    }
  };

  const handleAddBranch = async (formData) => {
    setIsSubmitting(true);
    try {

      const newBranch = await branchApi.createBranch(formData);
      console.log(newBranch,'new data branch')
      toast.success('Branch added successfully');
      setIsModalOpen(false);

    } catch (error) {
      toast.error(error)
    } finally{
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-1 md:p-2 lg:p-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Branch Management
        </h2>
        <AddButton
          onClick={() => setIsModalOpen(true)}
          btnHeading="Add Branch"
          logo={<FaBuilding size={20} className="md:size-6" />}
        />
      </div>

      <Table title="Branch List" columns={columns} data={data} />

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
