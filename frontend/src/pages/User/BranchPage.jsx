import React from 'react'
import AddButton from '../../components/UI/AddButton'
import { FaBuilding } from "react-icons/fa";
import Table from '../../components/UI/Table';

const BranchPage = () => {
  return (
    <div className='p-8 '>
        <div className='flex justify-between'>
          <h2 className='text-3xl font-semibold'>Branch</h2>
        <AddButton btnHeading={'Add Branch'} logo={<FaBuilding size={28}/>}/> 
        </div> 

            <Table title={'Branch'}/>
        





    
       
    </div>
  )
}

export default BranchPage