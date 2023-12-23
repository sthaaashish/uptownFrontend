import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckToSlot } from "@fortawesome/free-solid-svg-icons";
import CommentForm from "./CommentForm";

export function UnderlineTabs({ data }) {
  const [activeTab, setActiveTab] = useState("features");
  const headingTabs = [
    {
      label: "Features",
      value: "features",
      desc: [
        {
          label: "Floor Area",
          value: data.property_floorArea,
        },
        { label: "BedRooms", value: data.property_beds },
        { label: "Bathrooms", value: data.property_bathrooms },
        { label: "Location", value: data.property_address },
        { label: "Price", value: data.property_price },
      ],
    },
    {
      label: "Discription",
      value: "discription",
      desc: data.property_detail,
    },
    {
      label: "Review",
      value: "review",
    },
  ];
  return (
    <Tabs value={activeTab} className="p-12 pt-6">
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent  w-1/4 mx-auto justify-center"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
        }}
      >
        {headingTabs.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? "text-gray-900" : ""}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className="">
        {headingTabs.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {value === "features" ? (
              <ul>
                {desc.map((items, index) => (
                  <li key={index} className="text-black">
                    <FontAwesomeIcon
                      icon={faCheckToSlot}
                      className="text-pink-700 px-2"
                    />
                    {items.label}:{items.value}
                  </li>
                ))}
              </ul>
            ) : (
              <p>{desc}</p>
            )}
            {value === "review" && (
              <div>
                <CommentForm />
              </div>
            )}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
