import { Avatar, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import React from 'react'

const Comments = ({data}) => {
  return (
    <div>
      <Card key={data._id} color="transparent" shadow={false} className="w-full md:flex flex-row gap-4  max-w-sm">
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-2"
          >
            <Avatar
              size="lg"
              variant="circular"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt="tania andrew"
            />
          </CardHeader>
          <CardBody className="mb-2 p-0">
          {data.comments.map((comment, index) => (
                  <div key={index} className="border-b border-gray-300 py-2">
                    <p className='text-black'>{comment.username}</p>
                    <p>{data.createdAt.slice(0,10)}</p>
                    <p>{comment.comment}</p>
                  </div>
                ))}
          </CardBody>
        </Card>
    </div>
  )
}

export default Comments
