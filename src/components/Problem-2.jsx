import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Problem2 = () => {

    const navigate = useNavigate();
    const divRef = useRef(null);

    const [showModalA, setShowModalA] = useState(false);
    const [showModalB, setShowModalB] = useState(false);
    const [showModalC, setShowModalC] = useState(false);

    const toggleModalA = () => {
        setShowModalA(true);
        setShowModalB(false);
        navigate('/problem-2/All-Contacts');
    };

    const toggleModalB = () => {
        setShowModalB(true);
        setShowModalA(false);
        navigate('/problem-2/US-Contacts');
    };

    const openModalc = (data) => {
        setContact(data)
        setShowModalB(false);
        setShowModalA(false);
        setShowModalC(true);
    };

    const closeModalc = () => {
        setShowModalB(false);
        setShowModalA(false);
        setContact({})
        setShowModalC(false);
    };

    const closeModal = () => {
        setShowModalB(false);
        setShowModalA(false);
        navigate('/problem-2');
    }

    //All Contacts
    const [allContactsLoading, setAllContactsLoading] = useState(false);
    const [allContactsCheck, setAllContactsCheck] = useState(null);
    const [allContacts, setAllContacts] = useState([]);
    const [allContactsTable, setAllContactsTable] = useState([]);
    const [allContactsPage, setAllContactsPage] = useState(null);

    const [Contact, setContact] = useState({});

    const getAllContacts = () => {
        axios.get(`${process.env.BASE_URL}/contacts/`, {
            headers: {
                'accept': 'application/json',
                'X-CSRFToken': `${process.env.CSRFToken}`,
            }
        })
            .then(response => {
                // console.log('Response:', response.data);
                setAllContacts(response.data?.results)
                setAllContactsTable(response.data?.results);
                setAllContactsPage(response.data?.next)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        if (allContactsCheck) {
            setAllContactsTable(allContacts?.filter(each => each?.id % 2 == 0))
        }
        else {
            setAllContactsTable(allContacts)
        }

    }, [allContactsCheck])


    const handleAllContactSearch = (e) => {
        setAllContactsLoading(true)

        axios.get(`${process.env.BASE_URL}/contacts/?search=${e.target.value}`, {
            headers: {
                'accept': 'application/json',
                'X-CSRFToken': `${process.env.CSRFToken}`,
            }
        })
            .then(response => {
                setTimeout(() => {
                    setAllContactsLoading(false)
                    setAllContactsTable(response.data?.results);
                }, 1000); // Adjust the delay as needed
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleAllContactSearchKeyEnter = (e) => {
        if (event.key === 'Enter') {
            setAllContactsLoading(false)

            axios.get(`${process.env.BASE_URL}/contacts/?search=${e.target.value}`, {
                headers: {
                    'accept': 'application/json',
                    'X-CSRFToken': `${process.env.CSRFToken}`,
                }
            })
                .then(response => {
                    setAllContactsLoading(false)
                    setAllContactsTable(response.data?.results);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }


    //US Contacts
    const [usContactsLoading, setUSContactsLoading] = useState(false);
    const [usContactsCheck, setUSContactsCheck] = useState(null);
    const [usContacts, setUSContacts] = useState([]);
    const [usContactsTable, setUSContactsTable] = useState([]);
    const [usContactsPage, setUSContactsPage] = useState(null);

    const getUSContacts = () => {
        axios.get(`${process.env.BASE_URL}/country-contacts/United%20States/`, {
            headers: {
                'accept': 'application/json',
                'X-CSRFToken': `${process.env.CSRFToken}`,
            }
        })
            .then(response => {
                // console.log('Response:', response.data);
                setUSContacts(response.data?.results)
                setUSContactsTable(response.data?.results);
                setUSContactsPage(response.data?.next)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        if (usContactsCheck) {
            setUSContactsTable(usContacts?.filter(each => each?.id % 2 == 0))
        }
        else {
            setUSContactsTable(usContacts)
        }

    }, [usContactsCheck])

    const handleUSContactSearch = (e) => {
        setUSContactsLoading(true)

        axios.get(`${process.env.BASE_URL}/country-contacts/United%20States/?search=${e.target.value}`, {
            headers: {
                'accept': 'application/json',
                'X-CSRFToken': `${process.env.CSRFToken}`,
            }
        })
            .then(response => {
                setTimeout(() => {
                    setUSContactsLoading(false)
                    setUSContactsTable(response.data?.results);
                }, 1000); // Adjust the delay as needed
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleUSContactSearchKeyEnter = (e) => {
        if (event.key === 'Enter') {
            setUSContactsLoading(false)

            axios.get(`${process.env.BASE_URL}/country-contacts/United%20States/?search=${e.target.value}`, {
                headers: {
                    'accept': 'application/json',
                    'X-CSRFToken': `${process.env.CSRFToken}`,
                }
            })
                .then(response => {
                    setUSContactsLoading(false)
                    setUSContactsTable(response.data?.results);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }

    useEffect(() => {
        getAllContacts()
        getUSContacts()
    }, [])

    //Data fetch in modal A while scrolling
    const [isScrolledToBottomModal1, setIsScrolledToBottomModal1] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
          const modalContent = document.querySelector('.m1');
          if (modalContent) {
              const isAtBottom = modalContent.scrollHeight - modalContent.clientHeight <= modalContent.scrollTop + 1;
              setIsScrolledToBottomModal1(isAtBottom);
            }
        };
        
        const modalContent = document.querySelector('.m1');

      if (modalContent) {
        modalContent.addEventListener('scroll', handleScroll);
      }
      return () => {
        if (modalContent) {
          modalContent.removeEventListener('scroll', handleScroll);
        }
      };
    }, [showModalA]);

    useEffect(() => {
        if(isScrolledToBottomModal1){
            axios.get(allContactsPage, {
                headers: {
                    'accept': 'application/json',
                    'X-CSRFToken': `${process.env.CSRFToken}`,
                }
            })
                .then(response => {
                    setAllContacts([...usContacts, ...response.data?.results])
                    setAllContactsTable([...allContactsTable, ...response.data?.results]);
                    setAllContactsPage(response.data?.next)
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

    },[isScrolledToBottomModal1])


    //Data fetch in modal B while scrolling
    const [isScrolledToBottomModal2, setIsScrolledToBottomModal2] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
          const modalContent = document.querySelector('.m2');
          if (modalContent) {
              const isAtBottom = modalContent.scrollHeight - modalContent.clientHeight <= modalContent.scrollTop + 1;
              setIsScrolledToBottomModal2(isAtBottom);
            }
        };
        
        const modalContent = document.querySelector('.m2');

      if (modalContent) {
        modalContent.addEventListener('scroll', handleScroll);
      }
      return () => {
        if (modalContent) {
          modalContent.removeEventListener('scroll', handleScroll);
        }
      };
    }, [showModalB]);

    useEffect(() => {
        if(isScrolledToBottomModal2){
            axios.get(usContactsPage, {
                headers: {
                    'accept': 'application/json',
                    'X-CSRFToken': `${process.env.CSRFToken}`,
                }
            })
                .then(response => {
                    setUSContacts([...usContacts, ...response.data?.results])
                    setUSContactsTable([...usContactsTable, ...response.data?.results]);
                    setUSContactsPage(response.data?.next)
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

    },[isScrolledToBottomModal2])


    return (
        <>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

                    <div className="d-flex justify-content-center gap-3">
                        <button className="btn btn-lg btn-outline-primary" type="button" onClick={toggleModalA} >All Contacts</button>
                        <button className="btn btn-lg btn-outline-warning" type="button" onClick={toggleModalB} >US Contacts</button>
                    </div>

                </div>
            </div>

            {/* Modal A */}
            <div>
                {showModalA && (
                    <div className="modal show m1" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className='text-center'>Modal A</h1>
                                    <div>
                                        <button type="button" className="btn" style={{ color: '#46139f' }} onClick={toggleModalA}>All Contacts</button>
                                        <button type="button" className="btn mx-3" style={{ color: '#ff7f50' }} onClick={toggleModalB}>US Contacts</button>
                                        <button type="button" className="btn" style={{ backgroundColor: 'white', borderColor: '#46139f' }} onClick={closeModal}>Close</button>
                                    </div>
                                </div>
                                <div className="modal-body" ref={divRef}>
                                    <div>
                                        <div className="mb-3">
                                            <input type="email" className="form-control" placeholder='Search here' aria-describedby="emailHelp" onChange={handleAllContactSearch} onKeyPress={handleAllContactSearchKeyEnter} />
                                        </div>
                                    </div>

                                    {allContactsLoading ? <div className='text-center py-2'>Loading...</div> : <table className="table table-striped ">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Contact</th>
                                                <th scope="col">Country</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allContactsTable && Boolean(allContactsTable?.length) ?
                                                allContactsTable?.map((each, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{each?.id}</td>
                                                            <td onClick={() => { openModalc(each) }} className='text-primary'>{each?.phone}</td>
                                                            <td>{each?.country?.name}</td>
                                                        </tr>
                                                    )
                                                })
                                                : <div className='text-center py-2 text-danger'>No Data Found!</div>
                                            }
                                        </tbody>
                                    </table>}
                                </div>
                                <div className="modal-footer w-100">
                                    <div className="form-check w-100 text-left">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={() => { setAllContactsCheck(!allContactsCheck) }} checked={allContactsCheck} />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Only even
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {showModalA && <div className="modal-backdrop show"></div>}
            </div>

            {/* Modal B */}
            <div>
                {showModalB && (
                    <div className="modal show m2" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className='text-center'>Modal B</h1>
                                    <div>
                                        <button type="button" className="btn" style={{ color: '#46139f' }} onClick={toggleModalA}>All Contacts</button>
                                        <button type="button" className="btn mx-3" style={{ color: '#ff7f50' }} onClick={toggleModalB}>US Contacts</button>
                                        <button type="button" className="btn" style={{ backgroundColor: 'white', borderColor: '#46139f' }} onClick={closeModal}>Close</button>
                                    </div>
                                </div>
                                <div className="modal-body">

                                    <div>
                                        <div className="mb-3">
                                            <input type="email" className="form-control" placeholder='Search here' aria-describedby="emailHelp" onChange={handleUSContactSearch} onKeyPress={handleUSContactSearchKeyEnter} />
                                        </div>
                                    </div>


                                    {usContactsLoading ? < div className='text-center py-2'>Loading...</div> : <table className="table table-striped ">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Contact</th>
                                                <th scope="col">Country</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {usContactsTable && Boolean(usContactsTable?.length) ?
                                                usContactsTable?.map((each, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{each?.id}</td>
                                                            <td onClick={() => { openModalc(each) }} className='text-primary'>{each?.phone}</td>
                                                            <td>{each?.country?.name}</td>
                                                        </tr>
                                                    )
                                                })
                                                : <div className='text-center py-2 text-danger'>No Data Found!</div>
                                            }
                                        </tbody>
                                    </table>}

                                </div>
                                <div className="modal-footer w-100">
                                    <div className="form-check w-100 text-left">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={() => { setUSContactsCheck(!usContactsCheck) }} checked={usContactsCheck} />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Only even
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {showModalB && <div className="modal-backdrop show"></div>}
            </div>

            {/* Modal C */}
            <div>
                {showModalC && (
                    <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className='text-center'>Modal C</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { closeModalc() }}></button>
                                </div>
                                <div className="modal-body">

                                    <ul className="list-group">
                                        <li className="list-group-item"><span className='fw-bold'>ID: </span>{Contact?.id}</li>
                                        <li className="list-group-item"><span className='fw-bold'>Phone:</span> {Contact?.phone}</li>
                                        <li className="list-group-item"><span className='fw-bold'>Country:</span> {Contact?.country?.name}</li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {showModalC && <div className="modal-backdrop show"></div>}
            </div>
        </>
    );
};

export default Problem2;