import React from 'react'
import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import HeroCard from './components/HeroCard';
import Card from './components/Card';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';


function Main() {

  const [retreatData, setRetreatData] = useState(null);

  useEffect(() => {
    const fetchRetreatData = async () => {
      try {
        const response = await fetch(
          `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats/`
        );
        const data = await response.json();
        setRetreatData(data);
        // console.log(retreatData,"data")
        setFilteredData(data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRetreatData();
  },[]);

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(retreatData);
  }, [retreatData]);

  //scroll cards
  const carouselRef = useRef(null);

  const scrollLeft = () => {
      if (carouselRef.current) {
          carouselRef.current.scrollBy({
              left: -360, 
              behavior: 'smooth'
          });
      }
  };

  const scrollRight = () => {
      if (carouselRef.current) {
          carouselRef.current.scrollBy({
              left: 360, 
              behavior: 'smooth'
          });
      }
  };

  //search
  const [searchTxt, setSearchTxt] = useState("");
  console.log(searchTxt,"searchtext")

  const handleSearchChange = (event) => {
    const searchedKeyword = event.target.value.toLowerCase();;
    setSearchTxt(searchedKeyword);

    if (searchedKeyword === 'All') {
      setFilteredData(retreatData);
    } else {
      const filteredCards = retreatData.filter(data => data.condition.toLowerCase().includes(searchedKeyword));
      setFilteredData(filteredCards);
    }
  };

  const [date, setDate] = React.useState('');
  const [openDate, setOpenDate] = React.useState(false);

  const handleDateFilterChange = (event) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);

      if (selectedDate === 'All') {
        setFilteredData(retreatData);
      } else {
        const filteredCards = retreatData.filter(data => formatDate(data.date) === selectedDate);
        setFilteredData(filteredCards);
      }
  };

  const CloseDateFilter = () => {
    setOpenDate(false);
  };

  const OpenDateFilter = () => {
    setOpenDate(true);
  };
    
  const [Type, setType] = React.useState('');
  const [openType, setOpenType] = React.useState(false);
  
    const handleTypeFilterChange = (event) => {
      const selectedType = event.target.value;
      setType(selectedType);

      if (selectedType === 'All') {
        setFilteredData(retreatData);
      } else {
        const filteredCards = retreatData.filter(data => data.condition.includes(selectedType));
        setFilteredData(filteredCards);
      }
    };

    const CloseTypeFilter = () => {
      setOpenType(false);
    };

    const OpenTypeFilter = () => {
      setOpenType(true);
    };

    function formatDate(unixTime) {
      const date1 = new Date(unixTime * 1000);
      const year = date1.getFullYear();
      const month = String(date1.getMonth() + 1).padStart(2, '0');
      const day = String(date1.getDate()).padStart(2, '0');
    
      return `${day}-${month}-${year}`;
    }
    
    return (
      <div>
        <Header/>
        <div className='p-4'>
            <HeroCard/>
            <div className='py-8 flex flex-col lg:flex-row items-center gap-2 lg:gap-0 justify-between'>
              <div className='filters flex flex-col lg:flex-row gap-2 lg:gap-5'>
                <div>
                <FormControl sx={{ m: 1, minWidth: 300, }}>
                    <InputLabel id="demo-controlled-open-select-label">Filter by Date</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openDate}
                        onClose={CloseDateFilter}
                        onOpen={OpenDateFilter}
                        value={date}
                        label="Filter by Date"
                        onChange={handleDateFilterChange}
                    >
                    <MenuItem value="All"><em>All</em></MenuItem>
                    {Array.from(new Set(retreatData?.map(item => item.date)))?.map((date, index) => {
                      return (
                        <MenuItem key={index} value={formatDate(date)}>{formatDate(date)}</MenuItem>
                      );
                    })}
                    </Select>
                </FormControl>
                </div>
                <div>
                <FormControl sx={{ m: 1, minWidth: 300, }}>
                    <InputLabel id="demo-controlled-open-select-label">Filter by Type</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openType}
                        onClose={CloseTypeFilter}
                        onOpen={OpenTypeFilter}
                        value={Type}
                        label="Filter by Type"
                        onChange={handleTypeFilterChange}
                    >
                    <MenuItem value="All"><em>All</em></MenuItem>
                    {Array.from(new Set(retreatData?.map(item => item.condition)))?.map((condition, index) => {
                      return (
                        <MenuItem key={index} value={condition}>{condition}</MenuItem>
                      );
                    })}
                    </Select>
                </FormControl>
                </div>
              </div>
              <div>
                <form class="" role="search">
                  <input 
                  class="border-2 rounded outline-0 p-3.5" 
                  id="searchTxt" 
                  type="search" 
                  placeholder="Search" 
                  aria-label="Search"
                  value={searchTxt}
                  onChange={handleSearchChange}
                  style={{minWidth:"300px"}}
                  />
                </form>
              </div>
            </div>
            <div className='wrapper gap-5'>
                <div className='carousel' ref={carouselRef}>
                {filteredData?.map((item, index) => (
                  <Card
                    className="card"
                    key={index}
                    img={item.image}
                    title={item.title}
                    description={item.description}
                    date={item.date}
                    location={item.location}
                    price={item.price}
                  />
                ))}
                </div>
                <div className='text-center'>
                    <i id="left" class="fa-solid  fas fa-angle-left m-3" onClick={scrollLeft}></i>
                    <i id="right" class="fa-solid fas fa-angle-right m-3" onClick={scrollRight}></i>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default Main;
