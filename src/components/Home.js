import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import JobCard from '../components/JobCard'
import Pagination from '@mui/material/Pagination'
import { useMemo, useState, useEffect, useCallback } from 'react'
export default function Home ({ searchQuery }) {
  const jobsPerPage = 5
  const [pageCurrent, setPageCurrent] = useState(1)
  const [countPage, setCountPage] = useState(1)
  const [jobs, setJobs] = useState([])
  const indexOfLastJob = pageCurrent * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage
  const filteredJobs = useMemo(() => {
    if (searchQuery) {
      return jobs.filter(
        job =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.skills.join(' ').toLowerCase().includes(searchQuery.toLowerCase())
      )
    } else {
      return jobs
    }
  }, [jobs, searchQuery])
  const jobList = useMemo(() => {
    const slicedJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)
    setCountPage(Math.ceil(filteredJobs.length / jobsPerPage))
    return slicedJobs
  }, [filteredJobs, indexOfFirstJob, indexOfLastJob, jobsPerPage])
  const fetchData = useCallback(() => {
    setTimeout(() => {
      fetch('./data.json')
        .then(response => response.json())
        .then(data => {
          setJobs(data)
        })
    }, 1000) // simulate 1 second delay
  }, [])
  useEffect(() => {
    fetchData()
  }, [fetchData])
  useEffect(() => {
    setPageCurrent(1)
  }, [searchQuery])
  if (!jobs.length) {
    return <div>Loading...</div>
  }
  return (
    <Container>
      <Grid container spacing={1} my={2}>
        {jobList.map(job => (
          <Grid key={job.id} item xs={12} sm={6} md={4} lg={3}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        sx={{ marginTop: '15px', display: 'flex', justifyContent: 'center' }}
        count={countPage}
        color='primary'
        page={pageCurrent}
        onChange={(event, value) => {
          setPageCurrent(value)
        }}
      />
    </Container>
  )
}
