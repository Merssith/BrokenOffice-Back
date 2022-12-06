<a name="readme-top"></a>
[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Merssith/BrokenOffice-Back">
    <img src="utils/images/logo.png" alt="Logo" width="300">
  </a>

<h3 align="center">BACKEND GLOBANT BROKEN OFFICE</h3>

  <p align="center">
    <br />
    <a href="https://github.com/Merssith/BrokenOffice-Back"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://github.com/Merssith/BrokenOffice-Front"><strong>Frontend Repository</strong></a>
    <br />
    <a href="https://github.com/Merssith/BrokenOffice-Back/issues">Report bug</a>
    ·
    <a href="https://github.com/Merssith/BrokenOffice-Back/issues">Request feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-proyect">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#api-documentation">API Documentation</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Proyect

<p style="text-align:center;"><img src="utils/images/project.png" alt="Proyect" width="80%"></p>

Mobile first application that allows reporting problems and damaged items in the offices or homes of globers using geolocation, machine learning and other technologies to make the experience as simple as possible.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- NodeJS
- Nodemon
- Express
- Sequelize
- Postgres
- Voleyball
- Bcrypt
- JWT
- Handlebars
- Nodemailer
- FS
- DotEnv
- Mocha
- Chai
- Bluebird
- Cloudinary
- DataDog

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Currently the database is entirely local. Therefore, you will need to follow these instructions to build the backend project.

### Prerequisites

You must meet the following pre-requisites to be able to use this project

- DB: Create the DB using psql
  ```sh
  createdb brokenoffice
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Merssith/BrokenOffice-Back.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Seed database
   ```sh
   npm run seed
   ```
4. Generate the .env file, using as a base the example found in this repository
5. Run the server
   ```sh
   npm run server
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- API  -->

## API Documentation

<p style="text-align:center;"><img src="https://cdn.shopify.com/s/files/1/0057/5668/2355/files/Postman-logo-orange-2021_1155x.png?v=1637252529" alt="Logo" width="40%"></p>

Detailed documentation of all API methods can be found [here](https://documenter.getpostman.com/view/18263083/2s8YzP35ck).
You can also download the complete [Postman collection](https://api.postman.com/collections/18263083-ae76eece-22fc-491a-a564-3828736b5f04?access_key=PMAT-01GKM9HZEPR2NNHN1EJ14PKYRH).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Features for all users
  - [x] Sign up
  - [x] Login/Logout
  - [x] Session persistence
  - [x] Incident creation
  - [x] Incident history
  - [x] User profile
- [x] Admin features
  - [x] Assigned incidents
  - [x] Resolve incidents or change status
  - [x] Start chat
- [x] Super Admin features
  - [x] See all incidents
  - [x] See all users
  - [x] Manage users
- [x] Additional features
  - [x] Geolocation for all users and incidents
  - [x] Machine Learning for incidents
  - [x] Auto assignment of incidents to the closest administrator
  - [x] Chat
  - [x] Backend monitoring
  - [x] Email service

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

<p>Contributions from the Dev community help us learn, be inspired, and create new things! All contributions are welcome!</p>
<p>If you have any suggestions to improve our project, please fork the repository and create a pull request. Or You can also simply open an issue.</p>
<p>Thanks again!</p>

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/MyFeature`)
3. Commit your Changes (`git commit -m 'Add MyFeature'`)
4. Push to the Branch (`git push origin feature/MyFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

- Mercedes Salcedo » [Email](mercedes.salcedo1989@gmail.com) - [LinkedIn](https://www.linkedin.com/in/mercedessalcedojobs/)
- Patricio Imbrogno » [Email](patricioimbrogno@gmail.com) - [LinkedIn](https://www.linkedin.com/in/patricio-imbrogno)
- Rodrigo Escalera » [Email](roescal347@gmail.com) - [LinkedIn](https://www.linkedin.com/in/rodrigo-escalera-a00a97252/)
- Juan Manuel Arias » [Email](juanmaariasrodriguez@gmail.com) - [LinkedIn](https://www.linkedin.com/in/juan-manuel-arias-rodriguez/)
- Leandro Echezuri » [Email](leandro.echezuri@gmail.com) - [LinkedIn](https://www.linkedin.com/in/leandro-echezuri-671b58233/)

Project Link: [https://github.com/Merssith/BrokenOffice-Back](https://github.com/Merssith/BrokenOffice-Back)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/Merssith/BrokenOffice-Back.svg?style=for-the-badge
[contributors-url]: https://github.com/Merssith/BrokenOffice-Back/graphs/contributors
[issues-shield]: https://img.shields.io/github/issues/Merssith/BrokenOffice-Back.svg?style=for-the-badge
[issues-url]: https://github.com/Merssith/BrokenOffice-Back/issues
