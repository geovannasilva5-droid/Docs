# requirements.md --- Documento de Requisitos do Partiu Aula

**Projeto:** Partiu Aula --- Aplicativo de caronas para estudantes\
**Instituição:** IFTO --- Campus Paraíso\
**Turma:** 3ª série do Ensino Médio\
**Integrantes:** Emilly Roanny, Ana Luísa Neiva e Geovanna Gabrielly\
**Professor:** Pedro Henrique Amaral\
**Versão:** 1.1\
**Data:** 24/11/2026

------------------------------------------------------------------------

## 1. Introdução

O Partiu Aula é uma proposta de aplicativo que conecta estudantes que
precisam de transporte com estudantes que podem oferecer caronas. O
objetivo é facilitar o deslocamento até instituições de ensino, reduzir
os gastos com transporte e incentivar a colaboração entre os alunos.

Este documento consolida as informações dos três arquivos enviados: -
**CenáriosDeUso_PartiuAula.pdf:** problema, objetivo, persona, cenários
de uso, telas e reflexão sobre usabilidade. - **projeto- Partiu Aula
(1).pdf:** descrição e justificativa, público-alvo, persona e
funcionalidades principais. - **projeto- Partiu Aula (1)(1).pdf:** cópia
adicional da proposta, com as mesmas informações centrais do documento
anterior.

As informações repetidas nas duas propostas foram consolidadas para
evitar duplicações. Pontos não definidos nos documentos aparecem como
pendências, não como funcionalidades aprovadas.

## 2. Problema e justificativa

Estudantes enfrentam dificuldades para chegar às instituições de ensino
devido aos custos do transporte público ou privado, às grandes
distâncias e à oferta limitada de linhas e horários de ônibus. Isso pode
causar atrasos e pesar no orçamento.

O Partiu Aula pretende conectar alunos que possuem veículos com aqueles
que precisam de transporte em trajetos compatíveis, promovendo economia,
segurança e cooperação.

## 3. Objetivos do sistema

-   Conectar estudantes que oferecem caronas a estudantes que precisam
    de transporte.
-   Facilitar a busca por caronas.
-   Permitir o cadastro de ofertas com trajetos, horários, vagas e
    valores.
-   Organizar caronas agendadas e realizadas.
-   Permitir comunicação entre motoristas e passageiros.
-   Disponibilizar perfis e avaliações de viagens anteriores.
-   Contribuir para um deslocamento mais prático e econômico.

## 4. Público-alvo e persona

**Público-alvo:** estudantes do ensino médio, cursos técnicos,
institutos federais e universidades que procuram alternativas práticas e
econômicas para chegar às aulas.

**Persona --- Ana Clara** - **Idade:** 17 anos. - **Perfil:** estudante
de instituto federal que mora longe da instituição e depende de
transporte para chegar às aulas. - **Necessidades:** encontrar caronas
confiáveis, economizar dinheiro e organizar seus horários. -
**Dificuldades:** gastos com transporte, distância entre casa e escola e
poucas opções de deslocamento. - **Objetivo:** chegar às aulas com
praticidade, segurança e economia.

## 5. Escopo do sistema

### 5.1 Funcionalidades previstas nos documentos

1.  Buscar caronas por destino, data e horário, informando também
    origem.
2.  Oferecer caronas, cadastrando trajetos, horários, vagas disponíveis
    e valores.
3.  Conversar por chat entre motoristas e passageiros.
4.  Consultar perfis e avaliações de viagens anteriores.
5.  Visualizar e organizar viagens agendadas e realizadas em "Minhas
    Caronas".

Os cenários detalham também a solicitação de uma vaga, a publicação de
ofertas, a combinação do ponto de embarque pelo chat e a avaliação após
a viagem.

### 5.2 Fora do escopo confirmado

Os documentos não definem integração com pagamentos, rastreamento GPS em
tempo real, integração com mapas, verificação automática de documentos
ou integração com transporte público. Esses itens não são requisitos
confirmados nesta versão.

## 6. Atores

  -----------------------------------------------------------------------
  Ator                    Descrição               Objetivos
  ----------------------- ----------------------- -----------------------
  Estudante passageiro    Estudante que procura   Pesquisar, consultar
                          transporte              detalhes, solicitar
                                                  vaga, conversar e
                                                  avaliar

  Estudante motorista     Estudante que oferece   Cadastrar ofertas,
                          lugares no veículo      disponibilizar vagas e
                                                  conversar com
                                                  passageiros
  -----------------------------------------------------------------------

Os documentos não especificam se uma mesma conta poderá atuar nos dois
papéis. Essa regra precisa ser confirmada.

## 7. Requisitos funcionais

  -----------------------------------------------------------------------
  ID                      Requisito               Prioridade
  ----------------------- ----------------------- -----------------------
  RF-01                   O sistema deve permitir Alta
                          pesquisar caronas       
                          informando origem,      
                          destino, data e horário 
                          desejado.               

  RF-02                   O sistema deve          Alta
                          disponibilizar a ação   
                          "Buscar Caronas".       

  RF-03                   O sistema deve exibir   Alta
                          uma lista de ofertas    
                          compatíveis com a       
                          pesquisa.               

  RF-04                   Os resultados devem     Alta
                          apresentar foto do      
                          motorista, horário de   
                          saída, quantidade de    
                          vagas e valor.          

  RF-05                   O sistema deve permitir Alta
                          consultar os detalhes   
                          da carona antes da      
                          solicitação.            

  RF-06                   Os detalhes devem       Alta
                          apresentar informações  
                          do motorista,           
                          avaliações, rota e ação 
                          para solicitar reserva. 

  RF-07                   O passageiro deve poder Alta
                          solicitar uma vaga e    
                          confirmar o pedido.     

  RF-08                   O sistema deve          Alta
                          notificar o motorista   
                          sobre a solicitação     
                          recebida.               

  RF-09                   O sistema deve          Alta
                          registrar a solicitação 
                          inicial com status      
                          "Pendente".             

  RF-10                   A solicitação deve      Alta
                          ficar disponível em     
                          "Minhas Caronas".       

  RF-11                   O sistema deve permitir Alta
                          cadastrar partida,      
                          destino, horário de     
                          saída e quantidade de   
                          vagas.                  

  RF-12                   O sistema deve permitir Alta
                          informar o valor de     
                          contribuição sugerido   
                          por passageiro.         

  RF-13                   O sistema deve validar  Alta
                          as informações antes de 
                          publicar uma oferta.    

  RF-14                   Após a publicação       Alta
                          válida, o sistema deve  
                          confirmar o sucesso e   
                          disponibilizar a oferta 
                          na busca geral.         

  RF-15                   O sistema deve          Alta
                          organizar as caronas    
                          nas abas "Próximas" e   
                          "Histórico", exibindo   
                          seus status.            

  RF-16                   O sistema deve permitir Média
                          acessar o chat de uma   
                          viagem ativa.           

  RF-17                   O chat deve permitir    Média
                          enviar mensagens de     
                          texto e consultar o     
                          histórico.              

  RF-18                   O sistema deve permitir Média
                          avaliar a carona após o 
                          término da viagem, com  
                          nota de 1 a 5 estrelas. 

  RF-19                   A tela de avaliação     Média
                          deve oferecer um campo  
                          para comentário.        

  RF-20                   O sistema deve          Média
                          registrar a avaliação e 
                          atualizar a média do    
                          perfil do motorista.    

  RF-21                   O sistema deve exibir   Alta
                          mensagens claras de     
                          confirmação das ações.  

  RF-22                   O sistema deve destacar Alta
                          campos incorretos e     
                          orientar sua correção.  

  RF-23                   Quando não houver       Média
                          resultados, o sistema   
                          deve informar que       
                          nenhuma carona foi      
                          encontrada para a rota. 

  RF-24                   Quando não houver       Baixa
                          resultados, o sistema   
                          deve oferecer a opção   
                          de ativar um alerta     
                          para novas vagas.       
  -----------------------------------------------------------------------

## 8. Requisitos não funcionais

  -----------------------------------------------------------------------
  ID                      Requisito               Descrição
  ----------------------- ----------------------- -----------------------
  RNF-01                  Usabilidade             A interface deve ser
                                                  simples e apresentar
                                                  campos e ações de forma
                                                  clara.

  RNF-02                  Feedback                O sistema deve informar
                                                  quando uma ação for
                                                  concluída e atualizar o
                                                  status de forma
                                                  perceptível.

  RNF-03                  Comunicação             O chat deve entregar
                                                  mensagens em tempo
                                                  real, conforme descrito
                                                  no cenário de uso.

  RNF-04                  Segurança e confiança   O sistema deve
                                                  apresentar informações
                                                  dos usuários e
                                                  avaliações anteriores
                                                  para apoiar a escolha
                                                  da carona.

  RNF-05                  Tratamento de erros     Campos inválidos devem
                                                  ser destacados e
                                                  acompanhados de
                                                  instruções simples.

  RNF-06                  Orientação              Quando não houver
                                                  caronas, o sistema deve
                                                  informar o ocorrido e
                                                  oferecer uma
                                                  alternativa, como
                                                  ativar um alerta.
  -----------------------------------------------------------------------

Os documentos não estabelecem métricas técnicas de desempenho,
disponibilidade, acessibilidade ou proteção de dados. Esses critérios
precisam ser definidos pela equipe.

## 9. Regras de negócio

  -----------------------------------------------------------------------
  ID                                  Regra
  ----------------------------------- -----------------------------------
  RN-01                               Uma oferta deve informar partida,
                                      destino, horário de saída,
                                      quantidade de vagas e valor de
                                      contribuição sugerido.

  RN-02                               Uma oferta deve ser validada antes
                                      de ficar disponível na busca.

  RN-03                               Uma solicitação recém-enviada deve
                                      receber o status "Pendente".

  RN-04                               A solicitação pendente deve
                                      aparecer em "Minhas Caronas".

  RN-05                               O passageiro deve poder consultar
                                      os detalhes antes de solicitar a
                                      reserva.

  RN-06                               A avaliação deve ser realizada após
                                      o término da viagem.

  RN-07                               A nota da avaliação deve estar
                                      entre 1 e 5 estrelas.

  RN-08                               Após uma avaliação, a média do
                                      perfil do motorista deve ser
                                      atualizada.
  -----------------------------------------------------------------------

## 10. Cenários e fluxos de uso

### 10.1 Busca e reserva de carona

**Situação:** Ana Clara precisa garantir transporte para a aula do dia
seguinte e deseja evitar o ônibus lotado.

**Fluxo principal:** 1. A passageira abre o aplicativo. 2. Informa
origem, destino e horário desejado. 3. Seleciona "Buscar Caronas". 4.
Visualiza as opções disponíveis. 5. Escolhe uma opção e consulta os
detalhes. 6. Seleciona "Solicitar Carona" e confirma. 7. O sistema
notifica o motorista e registra o status "Pendente". 8. A solicitação
aparece em "Minhas Caronas", aguardando confirmação do motorista.

### 10.2 Cadastro e oferta de carona

**Situação:** um estudante motorista possui três vagas livres e deseja
dividir os custos do combustível com colegas.

**Fluxo principal:** 1. O motorista acessa "Oferecer Carona". 2. Informa
partida, destino, horário de saída e quantidade de vagas. 3. Informa o
valor de contribuição sugerido por passageiro. 4. Seleciona "Publicar
Carona". 5. O sistema valida os dados. 6. O sistema confirma a
publicação e adiciona a oferta à busca geral.

### 10.3 Chat e avaliação pós-viagem

**Situação:** a carona foi aceita e a passageira precisa combinar o
ponto exato de embarque. Depois da viagem, deseja avaliar o motorista.

**Fluxo principal:** 1. O usuário acessa "Minhas Caronas". 2. Abre o
chat da viagem ativa. 3. Envia mensagem informando o ponto de
referência. 4. Após o término da carona, acessa a avaliação. 5.
Seleciona uma nota de 1 a 5 estrelas e envia; a tela também prevê
comentário. 6. O sistema registra a nota e atualiza a média do perfil do
motorista.

## 11. Telas previstas

  -----------------------------------------------------------------------
  Tela                    Finalidade              Elementos principais
  ----------------------- ----------------------- -----------------------
  Tela Inicial / Busca    Pesquisar caronas       Origem, destino,
                                                  data/horário e botão de
                                                  busca

  Resultados da Busca     Listar opções           Cards com foto do
                          encontradas             motorista, horário,
                                                  vagas e valor

  Oferecer Carona         Cadastrar uma oferta    Partida, destino,
                                                  quantidade de vagas,
                                                  horário e valor

  Detalhes da Carona      Exibir informações      Dados do motorista,
                          antes da reserva        avaliações, rota e
                                                  botão de solicitação

  Minhas Caronas          Organizar viagens       Abas "Próximas" e
                                                  "Histórico", status e
                                                  acesso ao chat

  Chat Interno            Permitir comunicação    Caixa de texto,
                                                  histórico e botão
                                                  "Enviar"

  Avaliação               Registrar feedback      Estrelas de 1 a 5,
                                                  comentário e botão de
                                                  envio
  -----------------------------------------------------------------------

## 12. Mensagens e tratamento de situações

-   **Ação concluída:** exibir confirmação clara, como "Solicitação
    enviada com sucesso!", e atualizar o status em "Minhas Caronas".
-   **Erro de preenchimento:** destacar o campo incorreto em vermelho e
    apresentar uma instrução simples.
-   **Nenhum resultado:** exibir "Nenhuma carona encontrada para esta
    rota" e oferecer a ativação de alerta.
-   **Ponto de encontro impreciso:** permitir que os participantes
    combinem o local pelo chat. O material também sugere pontos de
    referência conhecidos próximos às escolas/campi.

## 13. Critérios de aceitação

  -----------------------------------------------------------------------
  ID                                  Critério
  ----------------------------------- -----------------------------------
  CA-01                               Ao pesquisar com os dados
                                      necessários, o sistema deve exibir
                                      caronas compatíveis ou informar que
                                      não foram encontradas opções.

  CA-02                               Ao solicitar e confirmar uma vaga,
                                      o sistema deve registrar o status
                                      "Pendente" e exibir a solicitação
                                      em "Minhas Caronas".

  CA-03                               Ao publicar uma oferta válida, o
                                      sistema deve confirmar a publicação
                                      e disponibilizar a carona na busca.

  CA-04                               Em uma carona ativa, o usuário deve
                                      conseguir abrir o chat e enviar uma
                                      mensagem.

  CA-05                               Após o término da viagem, o usuário
                                      deve conseguir enviar uma nota de 1
                                      a 5 estrelas.

  CA-06                               Após o envio da avaliação, o
                                      sistema deve registrar a nota e
                                      atualizar a média do motorista.

  CA-07                               Ao tentar concluir um formulário
                                      com dados inválidos, o sistema deve
                                      destacar o campo e orientar a
                                      correção.
  -----------------------------------------------------------------------

## 14. Usabilidade e validação

O documento de cenários identifica a combinação do ponto exato de
encontro como uma etapa que pode gerar dificuldade, pois pontos
genéricos podem causar divergências. Como solução, prevê um chat
integrado e sugere pontos de referência conhecidos próximos às
escolas/campi.

O sistema deve apresentar confirmações claras, atualizar os status das
viagens e orientar o usuário em caso de erro ou ausência de resultados.

A equipe relata ter realizado testes de usabilidade com um protótipo de
baixa fidelidade. Estudantes com perfil semelhante ao da persona
executaram as tarefas dos cenários, enquanto a equipe observou dúvidas,
erros e facilidades.

## 15. Pendências para definição da equipe

Os documentos não detalham os pontos abaixo. Eles precisam ser definidos
antes ou durante o planejamento da implementação:

1.  Como será realizado o cadastro e o acesso dos estudantes?
2.  Como o motorista aceitará ou recusará uma solicitação pendente?
3.  Quais serão todos os status possíveis de uma carona?
4.  Como funcionará o cancelamento de uma carona ou solicitação?
5.  Como o sistema controlará a quantidade de vagas disponíveis?
6.  O valor de contribuição será apenas informativo ou haverá pagamento
    pelo aplicativo?
7.  Como será definida a compatibilidade entre trajetos?
8.  Como funcionarão os alertas de novas vagas?
9.  Quem poderá acessar o chat e por quanto tempo o histórico será
    mantido?
10. Quem poderá avaliar uma viagem e como serão tratados comentários
    inadequados?
11. Quais dados dos perfis serão públicos?
12. Quais mecanismos de segurança e proteção de dados serão utilizados?
13. O aplicativo será desenvolvido para celular, navegador ou ambas as
    plataformas?
14. Quais serão os requisitos técnicos de desempenho e disponibilidade?

## 16. Síntese da proposta

Propõe-se desenvolver o Partiu Aula como um aplicativo de caronas
voltado a estudantes. A primeira versão deve priorizar as funções
centrais descritas na proposta: buscar caronas, oferecer vagas,
consultar perfis e avaliações, conversar por chat e organizar viagens em
"Minhas Caronas".

Os cenários detalham a busca e solicitação de vaga, a publicação de
ofertas e a comunicação seguida da avaliação pós-viagem. A interface
deve ser simples, apresentar mensagens de confirmação e orientar o
usuário quando ocorrer um erro ou quando não houver resultados.

As definições sobre cadastro, confirmação e cancelamento de reservas,
controle de vagas, privacidade e segurança devem ser concluídas pela
equipe, pois não estão especificadas nos documentos recebidos.

## 17. Fontes utilizadas

-   **CenáriosDeUso_PartiuAula.pdf**, páginas 1 a 5: identificação do
    projeto, problema, objetivo, persona, cenários, telas e reflexão
    sobre usabilidade.
-   **projeto- Partiu Aula (1).pdf**, páginas 1 e 2: descrição e
    justificativa, público-alvo, persona e funcionalidades principais.
-   **projeto- Partiu Aula (1)(1).pdf**, páginas 1 e 2: cópia adicional
    da proposta, com descrição e justificativa, público-alvo, persona e
    funcionalidades principais.

**Nota de consolidação:** os dois arquivos de proposta apresentam o
mesmo conteúdo central. Ambos foram considerados, mas as informações
repetidas foram reunidas em uma única especificação. As pendências estão
separadas dos requisitos identificados para não apresentar decisões
ainda não tomadas como requisitos aprovados.
