import React from 'react'
import AddButton from '../../components/UI/AddButton'
import { FaBuilding } from "react-icons/fa";
import Table from '../../components/UI/Table';
import Logo from '../../assets/logo.jpg'

const BranchPage = () => {


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




  return (
    <div className='p-8 '>
        <div className='flex justify-between'>
          <h2 className='text-3xl font-semibold'>Branch</h2>
        <AddButton btnHeading={'Add Branch'} logo={<FaBuilding size={28}/>}/> 
        </div> 

            <Table title={'Branch'} columns= {columns} data = {data} />
    
       
    </div>
  )
}

export default BranchPage