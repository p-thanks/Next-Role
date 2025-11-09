import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

// location
// salary
// job types

const filterData = [
  {
    filterType: "Location",
    array: [
      "New York",
      "San Francisco",
      "San Jose",
      "Seattle",
      "Austin",
      "Boston",
      "Los Angeles",
      "Chicago",
      "Dallas",
      "Houston",
      "Denver",
      "Atlanta",
      "Washington",
      "Miami",
      "Phoenix",
      "Portland",
      "Charlotte",
      "Nashville",
      "Philadelphia",
      "Minneapolis",
    ],
  },
  {
    filterType: "Industry / Job Role",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Mobile App Developer (iOS/Android)",
      "React Developer",
      "Node.js Developer",
      "Java Spring Boot Developer",
      "Python Developer",
      "Software Engineer (General)",
      "DevOps Engineer",
      "Cloud Engineer",
      "AWS Engineer",
      "Azure Cloud Engineer",
      "Cybersecurity Analyst",
      "Penetration Tester",
      "Data Analyst",
      "Data Scientist",
      "Machine Learning Engineer",
      "AI Research Engineer",
      "Blockchain Developer",
      "Game Developer / Unity",
      "Embedded Systems Engineer",
      "IoT Engineer",
      "Product Manager",
      "UI/UX Designer",
      "Quality Assurance (QA) Engineer",
      "Site Reliability Engineer (SRE)",
      "Technical Support Engineer",
    ],
  },
  {
    filterType: "Salary (USD / Year)",
    array: [
      "$40,000 - $60,000",
      "$60,000 - $90,000",
      "$90,000 - $120,000",
      "$120,000 - $160,000",
      "$160,000 - $200,000",
      "$200,000 - $300,000",
      "$300,000+",
    ],
  },
];

const FilterCard = () => {
  useGetAllJobs();

  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    // console.log(selectedValue);
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white py-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `r${index - idx}`;
              return (
                <div
                  className="flex items-center spac-x-2 gap-1 my-2"
                  key={idx}
                >
                  <RadioGroupItem value={item} id={itemId} />
                  <Label className="text-base/5" htmlFor={itemId}>
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
