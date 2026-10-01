DPONet

Desafio 6: Ferramenta de anonimização de documentos.

Problema: 
O problema proposto no desafio é a circulação de documentos que contenham informações sigilosas ou pessoais entre setores ou empresas. Isso torna o compartilhamento entre diferentes destinatários inviável ou arriscado. Pois não há como ter um controle sobre as informações do específicas do documento disponíveis para a leitura sem alterá-lo como um todo.

Solução:
 A solução que pensamos foi a criação de uma ferramenta de escaneamento de arquivos (PDF) ligada a um agente de OCR e outro de LLM para extrair e mapear as informações contidas no documento. O usuário terá a opção de selecionar as informações que serão escondidas atrás de uma tarja. É importante ressaltar que o PDF precisa necessariamente ser rasterizado (transformar informações de texto em uma imagem) ao ser finalizado para que a informação seja realmente perdida.


Exemplo de funcionamento:
O usuário acessa a interface, realiza o envio do documento PDF, o sistema utiliza a tecnologia OCR para extrair as informações contidas no arquivo, utiliza uma LLM para assimilar e contextualizar essas informações, e oferece ao usuário a opção de selecionar um trecho para ser anonimizado. Após a escolha do usuário, o sistema cria uma cópia de imagem do arquivo e utiliza as coordenadas do trecho escolhido para esconder o conteúdo contido no arquivo, após o processo ser finalizado, disponibiliza a cópia anonimizada para download.

Principais recursos da solução:

1. OCR Local com foco em privacidade e segurança

Utilização de um modelo de OCR executado integralmente no ambiente local da organização, permitindo a extração de informações de documentos sem a necessidade de enviar dados sensíveis para serviços externos.

Essa abordagem reduz a exposição das informações, aumenta o controle sobre os dados processados e facilita a adoção de políticas internas de segurança, privacidade e governança, contribuindo para a adequação aos requisitos da LGPD.

2. LLM Local para compreensão e busca semântica

Utilização de um modelo de linguagem pré-treinado (LLM) executado localmente, permitindo compreender o contexto das informações extraídas e realizar buscas semânticas mais precisas.

O modelo poderá relacionar informações, interpretar diferentes formas de consulta e identificar conteúdos relevantes mesmo quando os termos utilizados pelo usuário não correspondem exatamente aos dados armazenados.

A execução local também contribui para a segurança e confidencialidade das informações, evitando o compartilhamento dos dados processados com provedores externos.

3. Interface simples e intuitiva

Desenvolvimento de uma interface objetiva e de fácil utilização, com foco na análise e exploração dos dados.

A solução deverá priorizar uma experiência de uso simples, permitindo que os usuários realizem consultas, encontrem informações relevantes e analisem os resultados sem a necessidade de conhecimentos técnicos avançados.

4. Processamento integrado e seguro

Integração entre OCR, armazenamento, processamento de linguagem e busca semântica em um fluxo único, permitindo transformar documentos não estruturados em informações pesquisáveis e analisáveis.

Toda a arquitetura será projetada priorizando segurança, privacidade, rastreabilidade e controle dos dados, mantendo o processamento dentro do ambiente definido pela organização.

Diferencial da proposta:

Como diferencial da proposta, a solução será projetada para operar sobre uma infraestrutura local (on-premises), mantendo o processamento e o armazenamento dos dados dentro do ambiente controlado pela organização.
Essa abordagem proporciona maior segurança, privacidade e governança, reduzindo a dependência de serviços externos e evitando a necessidade de transferência de dados sensíveis para ambientes de terceiros.
A infraestrutura local permite ainda maior controle sobre:
Armazenamento e processamento dos dados;
Acesso às informações e permissões dos usuários;
Políticas de segurança e governança;
Monitoramento e rastreabilidade das operações;
Disponibilidade e continuidade do serviço;
Proteção de informações sensíveis e confidenciais.
