import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'

export default function JobDetails () {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  useEffect(() => {
    fetch('../data.json')
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          const job = data.find(j => j.id === id)
          setJob(job)
        }, 1000)
      })
  }, [id])
  if (!job) {
    return <div>Loading...</div>
  }
  return (
    <Container sx={{ mt: 2 }}>
      <Card variant='outlined'>
        <CardContent>
          <Typography variant='h5' color='text.secondary' gutterBottom>
            {job.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            City: {job.city}
          </Typography>
          <Typography sx={{ mb: 1 }} variant='body1'>
            Description: {job.description}
          </Typography>
          <Typography variant='body2'>
            Skills: {job.skills.join(', ')}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}
