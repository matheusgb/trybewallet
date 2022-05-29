import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addAssignment } from '../actions';

class Inputs extends React.Component {
  constructor() {
    super();
    this.state = {
      emailInput: '',
      senhaInput: '',
      botaoDisable: true,
    };
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => {
      const { emailInput, senhaInput } = this.state;
      const emailRegex = /\S+@\S+\.\S+/;
      const SENHA_LENGTH = 6;
      const validacaoEmail = emailRegex.test(emailInput);

      if (validacaoEmail && senhaInput.length >= SENHA_LENGTH) {
        this.setState({
          botaoDisable: false,
        });
      } else {
        this.setState({
          botaoDisable: true,
        });
      }
    });
  }

  render() {
    const { emailInput, senhaInput, botaoDisable } = this.state;
    const { add } = this.props;
    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            id="email"
            data-testid="email-input"
            name="emailInput"
            value={ emailInput }
            onChange={ this.changeHandler }
          />
        </label>

        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            id="senha"
            data-testid="password-input"
            name="senhaInput"
            value={ senhaInput }
            onChange={ this.changeHandler }
          />
        </label>

        <Link to="/carteira">
          <button
            type="button"
            disabled={ botaoDisable }
            onClick={ () => add(emailInput) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

Inputs.propTypes = {
  add: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  add: (value) => dispatch(addAssignment(value)),
});

export default connect(null, mapDispatchToProps)(Inputs);
