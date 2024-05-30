import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsFilter } from "react-icons/bs";

const Report = () => {
  const [showFilter, setShowFilter] = useState(false); // State for filter section visibility
  const [timeframe, setTimeframe] = useState(7);
  const [selectedProduct, setSelectedProduct] = useState('All');
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API, replace with your own data fetching logic
    // In this example, we use setTimeout to simulate a delay in fetching data
    setTimeout(() => {
      const dummyData = [
        {
          productId: 1,
          productName: 'Product A',
          companyName: 'Company X',
          weight: '100g',
          price: 10,
          unitsSold: 50,
          dateSold: new Date(),
        },
        {
          productId: 2,
          productName: 'Product B',
          companyName: 'Company Y',
          weight: '200g',
          price: 20,
          unitsSold: 75,
          dateSold: new Date(),
        },
        // Add more dummy data here
      ];
      setData(dummyData);
    }, 1000); // Simulated 1-second delay
  }, []);

  const filteredData = data.filter((item) => {
    // Calculate the number of days ago for each data entry
    const daysAgo = Math.ceil(
      (new Date() - new Date(item.dateSold)) / (1000 * 60 * 60 * 24)
    );

    if (selectedProduct === 'All') {
      return daysAgo <= timeframe;
    } else {
      return daysAgo <= timeframe && item.productName === selectedProduct;
    }
  });

  // Create an array of unique product names for the dropdown
  const productOptions = ['All', ...new Set(data.map((item) => item.productName))];

  return (
    <div className="my-6 p-4 bg-gray-100 border border-gray-300 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <BsFilter
            className={`mt-1 font-bold text-blue-800 text-3xl cursor-pointer${showFilter ? ' active' : ''}`}
            onClick={() => setShowFilter(!showFilter)}
          />

          {showFilter && (
            <>
              <div className='flex items-center space-x-2'>
                <label className="text-black font-bold ml-2">Filter by Product:</label>
                <select
                  className="border border-black p-2 rounded-xl w-[11em] text-black"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  {productOptions.map((product, index) => (
                    <option key={index} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-black font-bold ml-2">Filter by Days:</label>
                <select
                  className="border border-black p-2 rounded-xl w-[11em] text-black"
                  value={timeframe}
                  onChange={(e) => setTimeframe(parseInt(e.target.value))}
                >
                  <option value={7}>Last 7 Days</option>
                  <option value={30}>Last 30 Days</option>
                  <option value={90}>Last 90 Days</option>
                </select>
              </div>
            </>
          )}
        </div>
        <Link to='/PrintReport'>
          <button className="font- px-7 py-2 bg-red-500 text-white rounded-lg">
            Print
          </button>
        </Link>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Product Name</th>
            <th className="text-left">Company Name</th>
            <th className="text-left">Weight</th>
            <th className="text-left">Price</th>
            <th className="text-left">Units Sold in {timeframe} Days</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.productName}</td>
              <td>{item.companyName}</td>
              <td>{item.weight}</td>
              <td>{item.price}</td>
              <td>{item.unitsSold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
