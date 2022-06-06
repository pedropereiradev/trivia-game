import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setTriviaSettingsCategory,
  setTriviaSettingsDifficulty,
  setTriviaSettingsType,
} from '../redux/actions';
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

    if (categories) this.setState({ categories });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { setApiCategory, setApiDifficulty, setApiType, history } = this.props;
    const {
      categorySelected,
      difficultySelected,
      typeSelected } = this.state;

    setApiCategory(categorySelected);
    setApiDifficulty(difficultySelected);
    setApiType(typeSelected);

    history.push('/game');
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
              <option value="easy">Fácil</option>
              <option value="medium">Média</option>
              <option value="hard">Difícil</option>
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
              <option value="multiple">Múltipla escolha</option>
              <option value="boolean">Verdadeiro / Falso</option>
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

Settings.propTypes = {
  setApiCategory: PropTypes.func.isRequired,
  setApiDifficulty: PropTypes.func.isRequired,
  setApiType: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setApiCategory: (category) => dispatch(setTriviaSettingsCategory(category)),
  setApiDifficulty: (difficulty) => dispatch(setTriviaSettingsDifficulty(difficulty)),
  setApiType: (type) => dispatch(setTriviaSettingsType(type)),
});

export default connect(null, mapDispatchToProps)(Settings);
