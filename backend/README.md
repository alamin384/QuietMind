# QuietMind Backend

This is the Laravel backend for the QuietMind application. It provides authentication and CRUD operations for posts.

## Prerequisites

- PHP >= 8.2
- Composer
- MySQL

## Setup

1.  **Clone the repository** (if you haven't already).
2.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```
3.  **Install dependencies**:
    ```bash
    composer install
    ```
4.  **Environment Configuration**:
    - Copy `.env.example` to `.env` (already done if you created the project using `composer create-project`).
    - Update your `.env` file with your database credentials:
      ```env
      DB_CONNECTION=mysql
      DB_HOST=127.0.0.1
      DB_PORT=3306
      DB_DATABASE=quietmind_backend
      DB_USERNAME=root
      DB_PASSWORD=
      ```
5.  **Create Database**:
    - Make sure your MySQL server is running.
    - Create a database named `quietmind_backend`.
6.  **Run Migrations**:
    ```bash
    php artisan migrate
    ```

## Usage

### Run the Development Server

```bash
php artisan serve
```

The API will be available at `http://localhost:8000`.

### API Endpoints

#### Authentication (Laravel Breeze)

-   **Register**: `POST /register`
    -   Body: `name`, `email`, `password`, `password_confirmation`
-   **Login**: `POST /login`
    -   Body: `email`, `password`
    -   Response: `204 No Content` (Session based) or configured for tokens if utilizing Sanctum stateful.
    -   *Note*: Breeze API default uses Sanctum cookie-based session info. For purely token based, check `config/sanctum.php`.
    -   **Important**: Login requests trigger a `UserLogin` record creation.

#### Posts

All post routes differ slightly depending on if you are using SPA auth (cookies) or token auth. Ensure you are authenticated.

-   **Get All Posts**: `GET /api/posts`
-   **Get Single Post**: `GET /api/posts/{id}`
-   **Create Post**: `POST /api/posts`
    -   Body: `title`, `content`
-   **Update Post**: `PUT/PATCH /api/posts/{id}`
    -   Body: `title`, `content`
-   **Delete Post**: `DELETE /api/posts/{id}`

### Features Implementation Details

-   **User Login Tracking**:
    -   A `UserLogin` model and `user_logins` table track every login.
    -   This is handled by `App\Listeners\LogUserLogin` listening to `Illuminate\Auth\Events\Login`.
-   **Posts CRUD**:
    -   `Post` model with relationship to `User`.
    -   `PostController` handles the logic.
    -   Routes defined in `routes/api.php` wrapped in `auth:sanctum` middleware.
