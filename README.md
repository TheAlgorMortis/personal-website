## Dylan Reid's personal website
This project is a personal website for Dylan James Reid.

It has sections that display my profile, education, skills, and experience. You
can also log in to post on a blog forum, that anyone can view when logged out.

The website features dark mode, responsive design, links to other sites, and a
button to download my CV.


## Use of AI

I used chatGPT to help me better understand concepts of html, css, javascript
and React, since this was my first time learning it.

## Directory structure

```
27163229-rw343-project1/
personal-website/                   # all source code lives here
├── README.md           # This file
├── Makefile            # The makefile will add this
├── package.json
├── package-lock.json
├── vite.config.js
├── index.html
├── node_modules/        # ignored in git
├── public/              # static assets (served as-is)
│
└── src/
    ├── main.jsx         # React entry point
    ├── App.jsx          # root component
    ├── App.css          # root component CSS
    ├── index.css        # global CSS + :root vars
    │
    ├── components/      # React UI pieces
    │   ├── Home.jsx
    │   ├── Header.jsx
    │   ├── Header.css
    │   ├── Bodies.css
    │   ├── Education.jsx
    │   ├── Login.jsx
    │   ├── Blog.jsx
    │   ├── ImageButton.jsx
    │   └── Skills.jsx
    │
    ├── context/         # context provider for blog editing
    │   └── BlogItemProvider.jsx
    │
    └── assets/          # default blog images, profile picture and json files
```


## Project Setup

### Prerequisites
- Node.js (LTS) and npm installed on Ubuntu.

### Commands
Note that you must be in the Code directory to use the following commands.

- `make install` — installs dependencies.
- `make dev` — starts the Vite dev server at http://localhost:5173.
- `make build` — builds the production bundle to `dist/`.
- `make preview` — serves the built app at http://localhost:4173.
- `make clean` — removes `dist/` and `node_modules/`.

