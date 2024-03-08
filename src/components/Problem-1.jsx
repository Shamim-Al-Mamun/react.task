import React, { useEffect, useState } from 'react';

const Problem1 = () => {

    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [show, setShow] = useState('all');

    const handleClick = (val) => {
        setShow(val);
    }

    const [formData, setFormData] = useState({
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }
    const submit = (e) => {
        e.preventDefault()
        setData([...data, formData])
        setTableData([...data, formData])
    }

    useEffect(() => {
        if (show === 'active') {
            setTableData(data?.filter(each => each?.status == 'active'))
        }
        else if (show == 'completed') {
            setTableData(data?.filter(each => each?.status == 'completed'))
        }
        else {
            const statusOrder = ['active', 'completed', 'pending', 'archive'];

            const sortedData = data?.sort((a, b) => {
                const statusA = statusOrder.indexOf(a.status);
                const statusB = statusOrder.indexOf(b.status);
                return statusA - statusB;
            });

            setTableData(sortedData);
        }

    }, [show])

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={submit}>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Name" name="name" onChange={handleInputChange} />
                        </div>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Status" name="status" onChange={handleInputChange} />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData && Boolean(tableData?.length) ?
                                tableData?.map((each, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{each?.name}</td>
                                            <td>{each?.status}</td>
                                        </tr>
                                    )
                                })
                                : <div className='text-center text-danger'>No Data Found!</div>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;