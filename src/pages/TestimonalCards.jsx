import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';


const testimonials = [
    {
      content: "If you care for your time, I hands down would go with this.Designing with Figma components that can be easily ",
      author: "Bonnie Green",
      role: "Developer at Open AI",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png",
    },
    {
      content:
        "Designing with Figma components that can be easily translated to the utility classes of Tailwind CSS is a huge timesaver!",
      author: "Roberta Casas",
      role: "Lead designer at Dropbox",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png",
    },
    {
      content:
        "Aesthetically, the well designed components are beautiful and will undoubtedly level up your next application.",
      author: "Jese Leos",
      role: "Software Engineer at Facebook",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png",
    },
    {
      content:
        "You have many examples that can be used to create a fast prototype for your team.Designing with Figma components that can be easily ",
      author: "Jese Leos",
      role: "CTO at Youtube",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png",
    },
    {
        content:
          "You have many examples that can be used to create a fast prototype for your team.Designing with Figma components that can be easily ",
        author: "Joseph McFall",
        role: "CTO at Google",
        image:
          "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png",
      },
  ];


  const TestimonialCards = () => {
  
    const settings = {
       dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive:[
      {breakpoint:850,
      settings:{
        slidesToShow:1
      }}]
    };
  
    return (
      <>
        <Slider {...settings} className="mb-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-4">
              <Card
                color="transparent"
                shadow={false}
                className="w-full shadow-lg md:max-w-[26rem] mx-auto max-w-full"
              >
                <CardHeader
                  floated={false}
                  shadow={false}
                  className="mx-0 flex items-center gap-4 pt-0 pb-8"
                >
                  <h1>&quot;{testimonial.content} !!!&quot;</h1>
                </CardHeader>
                <CardBody className="mx-0 flex items-center gap-4 pt-0 pb-8">
                  <Avatar
                    size="lg"
                    variant="circular"
                    alt="tania andrew"
                    src={testimonial.image}
                  />
                  <div className="flex w-full flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      <Typography variant="h5" color="blue-gray">
                        {testimonial.author}
                      </Typography>
                    </div>
                    <Typography color="blue-gray">{testimonial.role}</Typography>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </Slider>
  
        
      </>
    );
  };
  
  export default TestimonialCards;





