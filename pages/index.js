import { useEffect, useState } from 'react';
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const url = `https://www.aoepulse.com/api/v1/civ_win_rates/`;
  const [data, setData] = useState([]);
  const [civilizationData, setCivilizationData] = useState({});

  function generateRandomID() {
    return Math.floor(Math.random() * 1000);
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(url);
      result.json().then(x => setData(x.civs_list.map(civilization => ({id: generateRandomID(), ...civilization}))));
    }
    fetchData();
  }, []);

  const handleRowClick = (event) => {
    setCivilizationData(data.filter(x => x.name == event.row.name)[0]);
  };
  
  useEffect(() => {
    console.log('Civilization value:', civilizationData);
  }, [civilizationData]);

  return (
    <>
      <Head>
        <title>Humber Front</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <DataGrid
              rows={data}
              columns={[{ field: 'name', headerName: 'Civilizations', width: 100 }]}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 20]}
              onRowClick={handleRowClick}
            />
          </Grid>
          <Grid item xs={6}>
            {civilizationData.name && 
              (<>
                <div className={styles.grid}>
                  <h1 className={styles.descriptionh1}>{civilizationData.name}</h1>
                  <p className={styles.descriptionp}>Played: {civilizationData.total}</p>
                  <p className={styles.descriptionp}>Wins: {civilizationData.wins}</p>
                </div>
              </>)
            }
          </Grid>
        </Grid>
      </main>
    </>
  )
}
