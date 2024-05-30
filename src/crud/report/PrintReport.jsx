import "../crud-css/insert.css";

function deliveryBoyInsert() {
 


  

  return (
    <div className="form-container-deliveryBoy">
      <form className="flex flex-wrap justify-center">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="Delivery Boy Name"
            //   value={name}
            //   onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="text"
              placeholder="Age"
            //   value={age}
            //   onChange={(e) => setAge(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
          <div className="form-group">
            <label htmlFor="phone_number">Phone Number:</label>
            <input
              type="text"
              placeholder="Phone Number"
            //   value={phone_number}
            //   onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
          <div className="form-group">
            <label htmlFor="state">State:</label>
            <input
              type="text"
              placeholder="State"
            //   value={state}
            //   onChange={(e) => setState(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              placeholder="City"
            //   value={city}
            //   onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              placeholder="Address"
            //   value={address}
            //   onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
          <div className="form-group">
            <label htmlFor="address">Bank Account No:</label>
            <input
              type="text"
              placeholder="Bank Account No"
            //   value={address}
            //   onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
          <div className="form-group">
            <label htmlFor="address">IFSC Code:</label>
            <input
              type="text"
              placeholder="IFSC Code"
            //   value={address}
            //   onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
          <div className="form-group">
            <label htmlFor="address">AdharCrad No:</label>
            <input
              type="text"
              placeholder="AdharCrad No"
            //   value={address}
            //   onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="px-4 py-2">
          <button type="" className="text-2xl form-btn-submit w-full">
            Print
          </button>
        </div>
      </form>
    </div>
  );
}

export default deliveryBoyInsert;
