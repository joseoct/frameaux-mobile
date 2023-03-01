<p align="center">
  <img src="https://i.imgur.com/pdGuGwr.png" alt="Frameaux_logo" />
</p>

<p align="center">
Meu trabalho de conclusão de curso para obter o diploma de bacharel em ciência da computação: <strong>Aplicativo para auxiliar o aprendizado de tecnologias multiplataforma(ReactNative, Flutter, Ionic) para o desenvolvimento de dispositivos móveis</strong> utilizando a metodologia de repetição espaçada e inspirado no aplicativo Duolingo.
</p>

#### _Veja também: [backend](https://github.com/joseoct/frameaux-backend) & [frontend](https://github.com/joseoct/frameaux-web) da plataforma_
## Mobile
Principal aplicação da plataforma, o app foi criado para estudantes consumirem o conteúdo cadastrado por criadores de conteúdo.

As telas a seguir, de  modo  a  ilustrar, possuem marcações em  vermelho  que  possuem  relação  com  o número da requisição feita para o backend conforme o [quadro de rotas do backend](https://github.com/joseoct/frameaux-backend#rotas-do-backend).

#### Telas de (A)SignIn e (B)Sign Up
<img src="https://i.imgur.com/lZxwqiT.png" alt="login" />

Tipo | Rota | Descrição
--- | --- | --- 
POST | 4. `/students` | Cria um estudante
POST | 6. `/sessions` | Envia as credenciais de conexão, se forem validadas, retorna informações do usuário e um JWT válido.

#### Telas de (A)Tecnologias e (B)Verificação de Nível
<img src="https://i.imgur.com/Ot3FG2V.png" alt="login" />

Tipo | Rota | Descrição
--- | --- | --- 
GET | 10. `/user/technologies` | Lista todas as tecnologias que fazem relação com o usuário
GET | 12. `/technologies/:technology_id/topics` | Lista todos os tópicos que fazem relação à tecnologia informada na rota
GET | 19. `/technologies` | Lista todas as tecnologias
GET | 21. `/technologies/:technology_id/test` | Retorna os exercícios do teste da tecnologia informada na rota

#### Telas de (A)Tópicos da tecnologia e (B)Explicação do tópico
<img src="https://i.imgur.com/6wTdRIO.png" alt="login" height="600px"/>

Tipo | Rota | Descrição
--- | --- | --- 
GET | 12. `/technologies/:technology_id/topics` | Lista todos os tópicos que fazem relação à tecnologia informada na rota
GET | 23. `/students-technologies/:technology_id` | Retorna a camada atual e as coroas do estudante em relação à tecnologia informada na rota. Além disso retorna as coroas totais da tecnologia
POST | 25. `/students-topics/:topic_id` | Cria a relação do estudante com o tópico informado na rota e define sua dificuldade atual como 1

#### Tela de um estudante que ja progrediu
<img src="https://i.imgur.com/TsgRbvw.png" alt="login" height="600px"/>

#### Tela de um exercício de alternativa (A)não respondido, (B)respondido corretamente e (C)respondido incorretamente
Para exercícios de alternativas o estudante deverá escolher uma alternativa e pressionar o botão “Verificar”.

<img src="https://i.imgur.com/TWsFUsT.png" alt="login" height="600px"/>

#### Tela de um exercício de sequência (A)não respondido, (B)respondido corretamente e (C)respondido incorretamente
Já  para  exercícios  de  sequência, o  estudante  deve  montar  a sequência correta pressionando em cada item da lista “respostas embaralhadas”, de modo a jogá-lo para a lista “respostas do usuário”. Ambas listas estão destacadas em vermelho na figura.

<img src="https://i.imgur.com/BjkZpp9.png" alt="login" height="600px"/>

#### Telas de um tópico (A)não começado, (B)nível 1 completo, (C)nível 2 completo, (D)nível 3 completo
<img src="https://i.imgur.com/Hqf43OC.png" alt="login"/>

#### Exercício proveniente de outro tópico (implementação da Repetição Espaçada)
Exercícios proveniente de outros tópicos (implementação da Repetição Espaçada) possuem uma tag “Você se lembra?”

<img src="https://i.imgur.com/tjkvXCD.png" alt="login"/>

[Link](https://drive.google.com/file/d/1wNvaCHskW_Ky1QivsNj1tYBnb6Hm9ljS/view) para conferir o trabalho completo.
