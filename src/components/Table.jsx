import {useEffect, useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import DataTable from 'react-data-table-component';
import { Modal } from './Modal';
import { ninjaArraySort } from '../utils/utility';

const Container = styled.div`
max-width:50vw;
margin: 0 auto;
border: 1px solid black;
`

export const Table = () => {
  const [kittensList, setKittensList] = useState([])
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [catRow, setCatRow] = useState()
  useEffect(()=>{
    axios.get('https://randomuser.me/api?results=100')
      .then(data => {
        setKittensList(data.data.results.map(kitten => kitten))
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
      selector: row => row.name
    },
    {
      name: 'Age',
      selector: row => row.age
    },
    {
      name: 'Ninja level',
      selector: row => row.level
    },
  ]

  const customSort = (rows, selector, direction) => rows.sort((rowA, rowB) => {
    const aField = selector(rowA)
    const bField = selector(rowB)
    return ninjaArraySort(aField,bField)
  });
   
  const handleClick = (row) => {
    setShowModal(prev => !prev);
    setCatRow(row)
  }

  return (
    <Container>
      <DataTable
        columns={columns}
        data={data}
        dense
        pagination
        onRowClicked={handleClick}
        sortFunction={customSort}
      />
      <Modal showModal={showModal} setShowModal={setShowModal} cat={catRow} />
    </Container>
  )
}
