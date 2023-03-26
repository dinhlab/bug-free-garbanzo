import LocationOnIcon from '@mui/icons-material/LocationOn'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { Link as RouterLink } from 'react-router-dom'

export default function JobCard ({ job }) {
  return (
    <Card
      sx={{
        minWidth: 275,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <CardContent>
        <Typography variant='h5'>{job.title}</Typography>
        <Typography color='text.secondary' sx={{ mb: 1 }}>
          <LocationOnIcon /> {job.city}
        </Typography>
        <Stack
          direction='row'
          spacing={1}
          sx={{ mb: 1 }}
          flexWrap='wrap'
          justifyContent='center'
          gap={0.5}
        >
          {job.skills.slice(0, 4).map((skill, index) => (
            <Chip key={index} variant='outlined' label={skill} />
          ))}
        </Stack>
        <Typography variant='body1'>{job.description}</Typography>
      </CardContent>
      <CardActions>
        <Link
          to={`/job/${job.id}`}
          title='Go to job details'
          underline='hover'
          component={RouterLink}
        >
          Learn More
        </Link>
      </CardActions>
    </Card>
  )
}
