
  # Access Deep Seven Beta

  Frontend lives in frontend/ and the API server lives in [backend/](backend/README.md).
  The original design is available at https://www.figma.com/design/IbgsKt4YKLKMuNXlT5NOHF/Access-Deep-Seven-Beta.

  Project documentation lives in [docs/](docs/).

  ## Repository Layout

  ```
  /
    frontend/       # Frontend (Vite + React)
    backend/        # Backend API (Node + Express)
  ```

  ## Quick Start

  ### 1) Frontend

  ```bash
  npm run install:client
  npm run dev:client
  ```

  If you want to install everything at once, run:

  ```bash
  npm run install:all
  ```

  ### 2) Backend

  ```bash
  npm run install:server
  npm run dev:server
  ```

  ### 3) Run Both (Optional)

  ```bash
  npm run dev:all
  ```

  The backend setup details are in [backend/README.md](backend/README.md).
  