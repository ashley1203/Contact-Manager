import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ContactService } from "../../../Services/contactService";
let EditContact = () => {

    let { contactId } = useParams();
    let navigate = useNavigate();

    let [state, setState] = useState({
        loading: false,
        contact: {
            name: '',
            imageUrl: '',
            mobile: '',
            email: '',
            company: '',
            title: '',
            groupId: ''
        },
        groups: [],
        errorMessage: ''
    });

    useEffect(() => {
        async function handleResp() {
            try {
                setState({
                    ...state,
                    loading: true
                })

                let response = await ContactService.getContact(contactId);
                let groupResponse = await ContactService.getGroups();

                setState({
                    ...state,
                    loading: false,
                    contact: response.data,
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
    }, [contactId]);

    let updateInput = (event) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [event.target.name]: event.target.value
            }
        })
    }

    let { loading, contact, groups, errorMessage } = state;

    let updateForm = async (event) => {
        event.preventDefault()
        try {
            let response = await ContactService.updateContact(state.contact, contactId);
            if (response) {
                navigate('/contacts/list', { replace: true });
            }
        }
        catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            });
            navigate(`/contacts/edit/${contactId}`, { replace: false });
        }
    }

    return (
        <React.Fragment>
            <pre>{JSON.stringify(state.contact)}</pre>
            <section className="add-contact p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-primary fw-bold">Update Contact</p>
                            <p className="fst-italic">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat veritatis dolorum mollitia in facilis deserunt illo ratione. Animi commodi qui eius veritatis magnam ipsam, eaque doloremque ad, minus dolorem amet.</p>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <form onSubmit={updateForm}>
                                <div className="mb-2">
                                    <input
                                        value={contact.name} name="name" onChange={updateInput}
                                        type="text" placeholder="Name" className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        value={contact.imageUrl} name="imageUrl" onChange={updateInput}
                                        type="text" placeholder="Photo Url" className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        value={contact.mobile} name="mobile" onChange={updateInput}
                                        type="number" placeholder="Mobile" className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        value={contact.email} name="email" onChange={updateInput}
                                        type="email" placeholder="Email" className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        value={contact.company} name="company" onChange={updateInput}
                                        type="text" placeholder="Company" className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        value={contact.title} name="title" onChange={updateInput}
                                        type="text" placeholder="Title" className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <select name="groupId" value={contact.groupId} onChange={updateInput}
                                        className="form-control">
                                        <option value="">Select a Group...</option>
                                        {
                                            groups.length > 0 &&
                                            groups.map((group) => {
                                                return (
                                                    <option key={group.id} value={group.id}>{group.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <input type="submit" className="btn btn-primary" value="update"></input>
                                    <Link to={'/contacts/list'} className="btn btn-dark ms-2">
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <img src={contact.imageUrl} alt="" className="img-list" />
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};

export default EditContact;