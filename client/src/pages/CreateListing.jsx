import React from 'react'

const CreateListing = () => {
  return (
      <main className='p-3 max-w-4xl mx-auto'>
          <h1 className='text-3xl font-semibold 
          text-center my-7 uppercase'>Create a listing</h1>
          <form action="" className='flex flex-col sm:flex-row gap-4'>
              <div className='flex flex-col gap-4 flex-1'>
                  <input
                      type="text"
                      placeholder='Name'
                      className='border p-3 rounded-lg'
                      id='name'
                      maxLength='62'
                      minLength='10'
                      required

                  />
                  <input
                      type="text"
                      placeholder='Description'
                      className='border p-3 rounded-lg'
                      id='description'
                      required

                  />
                  <input
                      type="text"
                      placeholder='Address'
                      className='border p-3 rounded-lg'
                      id='address'
                      required

                  />

                  <div className="flex gap-4 flex-wrap">
                      <div className="flex gap-2">
                          <input className='w-5' type="checkbox" id='sale' />
                          <span>Sell</span>
                      </div>
                      <div className="flex gap-2">
                          <input className='w-5' type="checkbox" id='rent' />
                          <span>Rent</span>
                      </div>
                      <div className="flex gap-2">
                          <input className='w-5' type="checkbox" id='parking' />
                          <span>Parking spot</span>
                      </div>
                      <div className="flex gap-2">
                          <input className='w-5' type="checkbox" id='furnished' />
                          <span>Furnished</span>
                      </div>
                      <div className="flex gap-2">
                          <input className='w-5' type="checkbox" id='offer' />
                          <span>Offer</span>
                      </div>
                  </div>

                  <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-2">
                          <input type="number" max='10' min='1' id='bedrooms' required
                            className='p-3 border border-gray-300 rounded-lg'
                          />
                          <p>Beds</p>
                      </div>
                      <div className="flex items-center gap-2">
                          <input type="number" max='10' min='1' id='bathrooms' required
                            className='p-3 border border-gray-300 rounded-lg'
                          />
                          <p>Bath</p>
                      </div>
                      <div className="flex items-center gap-2">
                          <input type="number" max='10' min='1' id='regularPrice' required
                            className='p-3 border border-gray-300 rounded-lg'
                          />
                          <div className="flex flex-col items-center">
                              <p>Regular Price</p>
                              <span className='text-xs'>( $ / month)</span>
                          </div>
                          
                      </div>
                      <div className="flex items-center gap-2">
                          <input type="number" max='10' min='1' id='discountPrice' required
                            className='p-3 border border-gray-300 rounded-lg'
                          />
                          <div className="flex flex-col items-center">
                              <p>Discounted Price</p>
                              <span className='text-xs'>( $ / month)</span>
                          </div>
                          
                      </div>
                  </div>
              </div>

              <div className="flex flex-col flex-1 gap-4">
                  <p className='font-semibold'>Images: </p>
                  <span className='font-normal 
                  text-gray-600 ml-2'>First image will be cover (max 6)</span>
                  <div className="flex  gap-4">
                      <input className='p-3 border 
                      border-gray-300 rounded w-full ' type="file" id='images' accept='image/*' multiple />
                      <button className='p-3 uppercase border border-green-700 
                      text-green-700 rounded
                      hover:shadow-lg disabled:opacity-80'>upload</button>
                  </div>
                  <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95'>Create Listing</button>
              </div>
              
          </form>
    </main>
  )
}

export default CreateListing