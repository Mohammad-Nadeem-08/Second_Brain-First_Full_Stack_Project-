import {Button} from './Components/Button'
import { Card } from './Components/Card'
import { PlusIcon } from './Icons/PlusIcon'
import { ShareIcon } from './Icons/ShareIcon'

function App() {

  return (
    <>
        <div>
          <div className='flex justify-end p-2 gap-4'>
            <Button variant='primary' content='Add Content' startIcon={<PlusIcon/>}></Button>
            <Button variant='secondary' content='Share Brain' startIcon={<ShareIcon/>}></Button>
          </div>
          
          <div className='flex p-2  gap-4 items-start'>
            <Card content="Pal Pal" type='youtube' link={"https://youtu.be/_e45NEdNMXE?si=K4iNB_HQUWszshHZ"}/>
            <Card content="Post" type={'twitter'} link='https://twitter.com/nadaa01012/status/1969459052821237789'/>
            <Card content="first Note" type={"notes"} notes={"fjas;kdhfjkhdfh;kfh;dsh"}/>
          </div>
        </div>
    </>
  )
}

export default App
