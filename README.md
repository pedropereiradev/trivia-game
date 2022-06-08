
# Trivia Game

Neste projeto foi desenvolvido um jogo de trivia, estilo show do milhão, onde a
pessoa usuária fará login e terá 30 segundos para responder uma pergunta aleatória
gerada pela [Open Trivia Database](https://opentdb.com/). É possível também escolher
a categoria das perguntas, a dificuldade e se deseja perguntas de verdadeiro/falso ou múltipla
escolha.

Ao fazer login é feita uma primeira requisição à API gerando um token utilizado
na requisição das perguntas. Esse token serve para garantir que a API não devolva
perguntas repetidas à pessoa que está jogando.

Para gerar o avatar da pessoa usuária, foi utilizado o email do login para que, após
realizada a criptografia utilizando Hash, fosse feita uma consulta no Gravatar,
devolvendo o avatar caso esteja cadastrado lá. 

Para poder ter um ranking das partidas realizadas, foi utilizado o localSotrage,
simulando um banco de dados, onde é armazenado o nome e avatar da pessoa e a 
sua pontuação.
## Habilidades

* Criar store Redux em aplicações React
* Criar reducers Redux em aplicações React
* Criar actions e actions assíncronas Redux em aplicações React
* Criar dispatchers Redux em aplicações React
* React;
* React-router-dom;
* Requisição à API;
* Escrever testes para garantir que sua aplicação possua uma boa cobertura de testes;
* Bootstrap.


## Demonstração

_[Projeto - Trivia Game](https://pedropereiradev-trivia.vercel.app/)_
## Screenshots

![Login Page Demo](/screenshots/trivia-login-page.png?raw=true "Login Page")

![Settings Page Demo](/screenshots/trivia-settings-page.png?raw=true "Settings Page")

![Game Page Demo](/screenshots/trivia-game-page.png?raw=true "Game page")

![Feedback Page Demo](/screenshots/trivia-feedback-page.png?raw=true "Feedback Page")

![Ranking Page Demo](/screenshots/trivia-ranking-page.png?raw=true "Ranking Page")

## Autores

- [@117CodAngelo](https://github.com/117CodAngelo)
- [@GeovanaAugusta](https://github.com/GeovanaAugusta)
- [@hosanavm](https://github.com/hosanavm)
- [@Nathan-Kimura](https://github.com/Nathan-Kimura)
- [@pedropereiradev](https://github.com/pedropereiradev)

