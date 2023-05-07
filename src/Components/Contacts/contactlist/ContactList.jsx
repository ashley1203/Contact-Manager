import React, { useEffect, useState } from "react";
import { Link, json } from "react-router-dom";
import { ContactService } from "../../../Services/contactService";
import BorderExample from "../../spinner/spinner";


let ContactList = () => {
    let [state, setState] = useState({
        loading: false,
        contacts: [],
        filterContacts: [],
        errorMessage: ''
    });

    let [querry, setQuerry] = useState({
        text: ''
    })

    useEffect(() => {
        async function handleResp() {
            try {
                setState({ ...state, loading: true });
                let response = await ContactService.getAllContacts()

                setState({
                    ...state,
                    loading: false,
                    contacts: response.data,
                    filterContacts: response.data
                });
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
    let { loading, contacts, filterContacts, errorMessage } = state;

    let clickDelete = async (contactId) => {
        try {
            let response = await ContactService.deleteContact(contactId);
            if (response) {
                setState({ ...state, loading: true });
                let response = await ContactService.getAllContacts()

                setState({
                    ...state,
                    loading: false,
                    contacts: response.data,
                    filterContacts: response.data
                });
            }
        }
        catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            })
        }
    }

    let searchContacts = (e) => {
        setQuerry({
            ...querry,
            text: e.target.value
        });
        let theContacts = state.contacts.filter(contact => {
            return contact.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setState({
            ...state,
            filterContacts: theContacts
        })
    }
    return (
        <React.Fragment>
            <section className="contact-search p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3">
                                Contact Manager
                                <Link to={'/contacts/add'} className="btn btn-primary ms-2">
                                    <i className="fa fa-plus-circle me-2"></i>
                                    New
                                </Link>
                            </p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores soluta nihil aspernatur facilis, repudiandae ex sequi eum id maiores. Alias eius eligendi tenetur vel perferendis earum iure ab inventore maiores!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque facilis saepe consectetur assumenda quasi maxime iste, debitis omnis beatae amet fuga, tempora quis ea laboriosam incidunt fugiat quidem aspernatur! Non?</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <form className="row">
                                <div className="col">
                                    <div className="mb-6">
                                        <input
                                            name="text"
                                            value={querry.text} onChange={searchContacts}
                                            type="text" placeholder="search names" className="form-control" />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-2">
                                        <input type="submit" className="btn btn-outline-dark" value="Search" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <BorderExample /> : <React.Fragment>
                    <section className="contact-list">
                        <div className="container">
                            <div className="row">
                                {
                                    filterContacts.length > 0 &&
                                    filterContacts.map(contact => {
                                        return (
                                            <div className="col-md-6">
                                                <div className="card my-2">
                                                    <div className="card-body">
                                                        <div className="row align-items-center d-flex justify-content-around">
                                                            <div className="col-md-4">
                                                                <img src={contact.imageUrl} alt="" className="img-list" />
                                                            </div>
                                                            <div className="col-md-7">
                                                                <ul className="list-group">
                                                                    <li className="list-group-item list-group-item-action">
                                                                        Name: <span className="fw-bold"> {contact.name} </span>
                                                                    </li>
                                                                    <li className="list-group-item list-group-item-action">
                                                                        Mobile: <span className="fw-bold"> {contact.mobile} </span>
                                                                    </li>
                                                                    <li className="list-group-item list-group-item-action">
                                                                        Email: <span className="fw-bold"> {contact.email} </span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-md-1 d-flex flex-column align-items-center">
                                                                <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning my-1">
                                                                    <i className="fa fa-eye"></i>
                                                                </Link>
                                                                <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary my-1">
                                                                    <i className="fa fa-pen"></i>
                                                                </Link>
                                                                <button className="btn btn-danger my-1" onClick={() => clickDelete(contact.id)}>
                                                                    <i className="fa fa-trash"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </section>
                </React.Fragment>
            }
        </React.Fragment>
    )
};

export default ContactList;