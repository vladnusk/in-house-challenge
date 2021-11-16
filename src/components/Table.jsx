import {useEffect, useState} from 'react'
import styled from 'styled-components'
import DataTable from 'react-data-table-component';
import { Modal } from './Modal';
import { ninjaArraySort } from '../utils/utility';

const Container = styled.div`
border: 1px solid black;
div {
      .rdt_TableRow:hover {
          cursor:pointer;
          filter: brightness(1.1);
          transform:translateX(-.1%);
        }
      }
`
export const Table = () => {
  const [pending, setPending] = useState(true)
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [catRow, setCatRow] = useState({})

  useEffect(async () => {
    const res = await fetch("/data.json");
    const kittens = await res.json();
    setData(kittens);
    setPending(false)
  },[])

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Age',
      selector: row => row.age, 
      sortable: true,
    },
    {
      name: 'Ninja Level',
      selector: row => row.level,
      sortable: true,
    },
  ]
 
  const handleClick = (row) => {
    setShowModal(prev => !prev);
    setCatRow(row)
  }

  const colorSet = {
    '0 | Academy': '#a9d6e5',
    '1 | Genin': '#89c2d9',
    '2 | Chuunin': '#61a5c2',
    '3 | Jounin': '#468faf',
    '4 | Special-Jounin': '#2c7da0',
    '5 | Kage': '#2a6f97',
    '6 | ANBU': '#014f86',
    '7 | Hunter': '#01497c',
    '8 | Master': '#013a63',
    '9 | S-Class': '#012a4a',
  }

  const conditionalRowStyles = [
    {
      when: (row) => row.level,
      style: (row) => ({
        backgroundColor: colorSet[row.level],
        color: '#ffffff',
      }),
    },
  ];

  return (
    <Container>
      <DataTable
        title='Kittens list'
        columns={columns}
        data={ninjaArraySort(data)}
        pagination
        onRowClicked={handleClick}
        defaultSortFieldId={3}
        conditionalRowStyles={conditionalRowStyles}
        progressPending={pending}
      />
      <Modal showModal={showModal} setShowModal={setShowModal} cat={catRow} />
    </Container>
  )
}