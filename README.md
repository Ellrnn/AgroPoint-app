Este é um aplicativo feito para ser uma ferramenta que auxilia os produtores rurais 👩‍🌾 no seu dia a dia. Utilizando a plataforma React Native para coletar esses pontos amostrados.(georreferenciados 📍🧭)

## Tecnologias Utilizadas

- [React Native](https://reactnative.dev/): Um framework JavaScript para desenvolver aplicativos móveis nativos.
- [Expo](https://expo.io/): Uma plataforma e conjunto de ferramentas para desenvolver aplicativos React Native de forma mais fácil e rápida.

## Instalação

Siga os passos abaixo para configurar e executar o projeto na sua máquina local.

### Pré-requisitos

Certifique-se de ter o Node.js (mínimo 16) e o npm instalados no seu sistema. Você pode baixá-los em [nodejs.org](https://nodejs.org/).

### Etapa 1: Clone o repositório

```bash
git clone https://github.com/Ellrnn/AgroPoint-app.git
cd AgroPoint-app
cp .env.example .env
```

### Etapa 2: Instale as dependências

```bash
yarn install
```

### Etapa 3: Execute o projeto Expo

Para iniciar o projeto Expo em seu ambiente de desenvolvimento, você pode usar os seguintes comandos:

#### Expo Go (disponível em dispositivos móveis)

Para executar o projeto em seu dispositivo móvel, você pode usar o Expo Go, que está disponível para dispositivos Android e iOS. Siga estas etapas:

1. Baixe o aplicativo Expo Go na [App Store](https://apps.apple.com/app/apple-store/id982107779) (para iOS) ou no [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent) (para Android).

2. Certifique-se de que seu dispositivo esteja conectado à mesma rede Wi-Fi que seu computador.

3. Execute o seguinte comando para iniciar o projeto no Expo:

```bash
yarn start
```

Se precisar compartilhar o projeto com outros membros da equipe, use:

```bash
yarn start --tunnel
```

4. Escaneie o código QR gerado com o aplicativo Expo Go em seu dispositivo móvel.

#### Emulador Android (Pixel_3_API_32)

Certifique-se de ter um emulador Android configurado em sua máquina local.

```bash
expo start --android
```

#### Simulador iOS (iPhone 14)

Para emular o aplicativo em um dispositivo iOS, você precisará de um Mac com Xcode instalado. Abra o projeto no Xcode e execute-o no simulador do iPhone 14.

```bash
expo start --ios
```

### Etapa 4: executar testes

#### Testes unitários

Para executar testes unitários com o Jest, use o seguinte comando:

```bash
yarn test
```
