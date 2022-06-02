import React, { Component } from 'react';
import { fetchApiCategories } from '../services/triviaAPI';

class Settings extends Component {
  constructor() {
    super();

    this.state = {
      categorySelected: '',
      difficultySelected: '',
      typeSelected: '',
      categories: [],
    };
  }

  async componentDidMount() {
    const categories = await fetchApiCategories();

    this.setState({ categories });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // To-Do: Criar store, armazenar o estado para chamar a requisição na tela de Game ou mudar ela pra ca
  }

  render() {
    const { categories, categorySelected, difficultySelected, typeSelected } = this.state;
    return (
      <div>
        <h1 data-testid="settings-title">Settings</h1>
        <form>
          <label htmlFor="categorySelected">
            Categoria:
            <select
              value={ categorySelected }
              onChange={ this.handleChange }
              name="categorySelected"
              id="categorySelected"
            >
              <option value="">Todas categorias</option>
              {categories.map(({ id, name }) => (
                <option value={ id } key={ id }>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="difficultySelected">
            Dificuldade:
            <select
              value={ difficultySelected }
              onChange={ this.handleChange }
              name="difficultySelected"
              id="difficultySelected"
            >
              <option value="">Qualquer dificuldade</option>
              <option value="">Fácil</option>
              <option value="">Média</option>
              <option value="">Difícil</option>
            </select>
          </label>
          <label htmlFor="typeSelected">
            Tipo:
            <select
              value={ typeSelected }
              onChange={ this.handleChange }
              name="typeSelected"
              id="typeSelected"
            >
              <option value="">Qualquer Tipo</option>
              <option value="">Múltiĺa escolha</option>
              <option value="">Verdadeiro / Falso</option>
            </select>
          </label>

          <button
            type="submit"
            onClick={ this.handleSubmit }
          >
            Aplicar configurações
          </button>
        </form>
      </div>
    );
  }
}

export default Settings;
