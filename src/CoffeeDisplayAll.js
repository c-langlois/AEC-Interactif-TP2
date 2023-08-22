import React, { useState } from 'react';
import CoffeeDisplayEach from './CoffeeDisplayEach.js';
import CoffeeAdd from './CoffeeAdd';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CoffeeDisplayAll(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="showCoffePost">
      <div className="sousTitle">
        <button  className="btnAddCafee" onClick={handleShow}>
        <h5>Ajouter un café</h5>
        <img src="/icons/cafe-plus.svg" className="coffee-icon" alt="Add a coffee" />
        </button>
      </div>
      <div>
      <div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body><CoffeeAdd getCoffee={props.getCoffee} handleClose={handleClose}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
        </Modal>
      </div>
      </div>
      <div className="showAllCoffee">
      {props.coffees.length > 0 && (
        props.coffees.map(coffee => (
          <CoffeeDisplayEach key={coffee.id} coffee={coffee} getCoffee={props.getCoffee}/>
        ))
      )}
      </div>
    </div>
  )
}

export default CoffeeDisplayAll;