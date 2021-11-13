import {useEffect, useState} from 'react'
import axios from 'axios'
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

  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [catRow, setCatRow] = useState()

  useEffect(()=>{
    axios.get('https://randomuser.me/api?results=100')
      .then(data => {
        setData(
          data.data.results.map((kitten, index) => {
            const ninjaLevel = () => {
              const randomize = Math.floor(Math.random() * 10);
              if(randomize >= 7) return 'Jonin'
              if(randomize >= 4 && randomize < 7 ) return 'Chunin'
              return 'Genin'
            }
            return {
              id: index,
              name: kitten.name.first,
              age: Math.floor(Math.random() * (4) + 1),
              level: ninjaLevel(),
            }
          })
        )
      })
      .catch(err => console.error(err))
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
    'Jonin': '#2abe2f',
    'Chunin': '#2bbb8d',
    'Genin': '#2bb1bb',
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
      />
      <Modal showModal={showModal} setShowModal={setShowModal} cat={catRow} />
    </Container>
  )
}