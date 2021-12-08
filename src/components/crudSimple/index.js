import React from 'react';
import { Container, Nav, Row } from 'react-bootstrap';
import CrudSimpleBuscar from './crud/buscar';
import CrudSimpleCrear from './crud/crear';
import CrudSimpleEditar from './crud/editar';
import './crudSimple.css';

export default class CrudSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'buscar',
      _id: null,
    };
    this.changeTab = this.changeTab.bind(this);
    this.setIdCrudSimple = this.setIdCrudSimple.bind(this);
    this.getIdCrudSimple = this.getIdCrudSimple.bind(this);
  }

  changeTab(tab) {
    this.setState({ currentTab: tab });
  }

  setIdCrudSimple(id) {
    this.setState({ _id: id });
  }

  getIdCrudSimple() {
    return this.state._id;
  }
  //
  render() {
    return (
      <Container id="crudSimple-container">
        <Row>
          <Nav
            fill
            variant="tabs"
            defaultActiveKey="buscar"
            onSelect={(eventKey) => this.setState({ currentTab: eventKey })}
          >
            <Nav.Item>
              <Nav.Link eventKey="buscar">Buscar</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="crear">Crear</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>
          {this.state.currentTab === 'buscar' ? (
            <CrudSimpleBuscar
              changeTab={this.changeTab}
              setIdCrudSimple={this.setIdCrudSimple}
            />
          ) : this.state.currentTab === 'crear' ? (
            <CrudSimpleCrear changeTab={this.changeTab} />
          ) : (
            <CrudSimpleEditar
              changeTab={this.changeTab}
              getIdCrudSimple={this.getIdCrudSimple}
            />
          )}
        </Row>
      </Container>
    );
  }
}
