import React from 'react';
import { request } from '../../helper/helper';
import { Container, Row } from 'react-bootstrap';
import DataGrid from '../../grid/grid';
import ConfirmationPromprs from '../../prompts/confirmation';
import Loading from '../../loading/loading';
import MessagePrompt from '../../prompts/message';

const columns = [
  {
    dataField: '_id',
    text: 'Product ID',
    hidden: true,
  },

  {
    dataField: 'fila_1',
    text: 'Name',
  },
  {
    dataField: 'fila_2',
    text: 'last name',
  },
  {
    dataField: 'fila_3',
    text: 'adrees',
  },
  {
    dataField: 'fila_4',
    text: 'phone number',
  },
  {
    dataField: 'fila_5',
    text: 'email',
  },
  {
    dataField: 'fila_6',
    text: 'medicine',
  },
  {
    dataField: 'fila_7',
    text: 'Minimarket',
  },
  {
    dataField: 'fila_8',
    text: 'locker room',
  },
];

export default class CrudSimpleBuscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      idCrudSimple: null,
      confirmation: {
        title: 'Eliminar',
        text: '¿Deseas eliminar?',
        show: false,
      },
      message: {
        text: '',
        show: false,
      },
    };

    this.onClickEditButton = this.onClickEditButton.bind(this);
    this.onClickDeleteButton = this.onClickDeleteButton.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onClickEditButton(row) {
    this.props.setIdCrudSimple(row._id);

    this.props.changeTab('editar');
  }

  onClickDeleteButton(row) {
    this.setState({
      idCrudSimple: row._id,
      confirmation: {
        ...this.state.confirmation,
        show: true,
      },
    });
  }

  onCancel() {
    this.setState({
      confirmation: {
        ...this.state.confirmation,
        show: false,
      },
    });
  }

  onConfirm() {
    this.setState(
      {
        confirmation: {
          ...this.state.confirmation,
          show: false,
        },
      },
      this.eliminarCrudSimple()
    );
  }

  eliminarCrudSimple() {
    this.setState({ loading: true });
    request
      .delete(`/crudSimple/${this.state.idCrudSimple}`)
      .then((response) => {
        this.setState({
          loading: false,
          message: {
            text: response.data.msg,
            show: true,
          },
        });
        if (response.data.exito) this.reloadPage();
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  }

  render() {
    return (
      <Container id="crudSimple-buscar-container">
        <ConfirmationPromprs
          show={this.state.confirmation.show}
          title={this.state.confirmation.title}
          text={this.state.confirmation.text}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />

        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2500}
          onExited={this.onExitedMessage}
        />

        <Loading show={this.state.loading} />

        <Row>
          <h1>Buscar</h1>
        </Row>
        <Row>
          <DataGrid
            url="/crudSimple"
            columns={columns}
            showEditButton={true}
            showDeleteButton={true}
            onClickEditButton={this.onClickEditButton}
            onClickDeleteButton={this.onClickDeleteButton}
          />
        </Row>
      </Container>
    );
  }
}
