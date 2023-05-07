import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../../Services/contactService";
let AddContact = () => {

    let navigate = useNavigate();

    let [state, setState] = useState({
        loading: false,
        contact: {
            name: '',
            imageUrl: '',
            email: '',
            mobile: '',
            company: '',
            title: '',
            groupId: '',
        },
        groups: [],
        errorMessage: ''
    });

    let updateInput = (event) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [event.target.name]: event.target.value
            }
        });
    };

    useEffect(() => {
        async function handleResp() {
            try {
                setState({
                    ...state,
                    loading: true
                })
                let groupResponse = await ContactService.getGroups();
                setState({
                    ...state,
                    loading: false,
                    groups: groupResponse.data
                })
            }
            catch (error) {
                setState({
                    ...state,
                    loading: false,
                    errorMessage: error.message
                })
            }
        };

        handleResp();
    }, []);

    let { loading, contact, groups, error } = state;

    let submitForm = async (event) => {
        event.preventDefault();
        try {
            let create = await ContactService.createContact(state.contact);
            if (create) {
                navigate('/contacts/list', { replace: true });
            }
        }
        catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            });
            navigate('/contacts/add', { replace: false });
        }
    };
    return (
        <React.Fragment>
            <section className="add-contact p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success fw-bold">Create Contact</p>
                            <p className="fst-italic">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat veritatis dolorum mollitia in facilis deserunt illo ratione. Animi commodi qui eius veritatis magnam ipsam, eaque doloremque ad, minus dolorem amet.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={submitForm}>
                                <div className="mb-2">
                                    <input
                                        name="name"
                                        value={contact.name}
                                        onChange={updateInput}
                                        type="text" placeholder="Name" className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="imageUrl" value={contact.imageUrl} onChange={updateInput}
                                        type="text" placeholder="Photo Url" className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="mobile" value={contact.mobile} onChange={updateInput}
                                        type="number" placeholder="Mobile" className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="email" value={contact.email} onChange={updateInput}
                                        type="email" placeholder="Email" className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="company" value={contact.company} onChange={updateInput}
                                        type="text" placeholder="Company" className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="title" value={contact.title} onChange={updateInput}
                                        type="text" placeholder="Title" className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <select
                                        name="groupId" value={contact.groupId} onChange={updateInput}
                                        className="form-control">
                                        <option value="">Select a Group...</option>
                                        {
                                            groups.length > 0 &&
                                            groups.map((g) => {
                                                return (
                                                    <option key={g.id} value={g.id}>{g.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <input type="submit" className="btn btn-success" value="Create"></input>
                                    <Link to={'/contacts/list'} className="btn btn-dark ms-2">
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};

export default AddContact;