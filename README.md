<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![GPL3.0][license-shield]][license-url]
![Vercel](http://therealsujitk-vercel-badge.vercel.app/?app=cineflick)

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/anapeksha/cineflick">
    <img src="product_assets/logo.png" alt="Logo" width="80" height="80" style="object-fit:contain">
  </a>

  <h3 align="center">Cineflick</h3>

  <p align="center">
    A web app to search and download torrents of most movies!
    <br />
    <br />
    <a href="https://github.com/anapeksha/cineflick/issues">Report Bug</a>
    ·
    <a href="https://github.com/anapeksha/cineflick/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
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
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Screen Shot][product-screenshot]](https://github.com/anapeksha/cineflick)

<p align="right">(<a href="#top">Back to top</a>)</p>

### Built With

- [Next.js](https://nextjs.org)
- [BCrypt](https://github.com/kelektiv/node.bcrypt.js)
- [Cookie](https://github.com/jshttp/cookie)
- [Mongoose](https://github.com/Automattic/mongoose)
- [Jose](https://github.com/panva/jose)
- [MUI](https://mui.com/)
- [YTS API](https://yts.mx/api/)
- [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction/)

<p align="right">(<a href="#top">Back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Instructions on how to set up the project.

### Prerequisites

[Node.js](https://nodejs.org) v18.

```sh
corepack enable
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/anapeksha/Finderbar.git
   ```
2. Install NPM packages
   ```sh
   yarn install
   ```
3. Configure [TMDB](https://www.themoviedb.org/) api key. Instructions [here](https://developers.themoviedb.org/3/getting-started/introduction)

4. Configure the TMDB api key, salt rounds for password hashing, MongoDB url, secret for jwt encoding in `.env`, sample can be found in `.env.sample`

5. Start the Development server

   ```sh
   yarn dev
   ```

6. Create a production build
   ```sh
   yarn build
   ```

<p align="right">(<a href="#top">Back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

The website can be used to checkup on movies and download their corresponding torrents.

<p align="right">(<a href="#top">Back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the GPL 3.0 License. See `LICENSE` for more information.

<p align="right">(<a href="#top">Back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/github/license/anapeksha/cineflick.svg
[license-url]: https://github.com/anapeksha/cineflick/blob/main/LICENSE
[product-screenshot]: https://github.com/anapeksha/cineflick/blob/main/product_assets/screenshot.png
