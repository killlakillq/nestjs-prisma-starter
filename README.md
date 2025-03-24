# NestJS Prisma Starter

A modern NestJS starter project with Prisma ORM, GraphQL, and PostgreSQL integration.

## Features

- 🚀 NestJS framework
- 📊 Prisma ORM with PostgreSQL
- 📈 GraphQL API with Apollo Server
- 🔐 JWT Authentication
- 🐳 Docker support
- 📝 Swagger documentation
- 🧪 Testing setup with Jest

## Prerequisites

- Node.js (version specified in `.node-version`)
- Docker and Docker Compose (optional, for containerized setup)
- PostgreSQL (if running locally)

## Setup Instructions

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/killlakillq/nestjs-prisma-starter.git
cd nestjs-prisma-starter
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration.

4. Start the database:

```bash
npm run docker:db
```

5. Run database migrations:

```bash
npm run migrate:dev
```

6. Generate Prisma client:

```bash
npm run prisma:generate
```

7. Start the development server:

```bash
npm run start:dev
```

### Docker Setup

1. Build and start all services:

```bash
npm run docker:build
npm run docker
```

2. Run migrations:

```bash
npm run docker:migrate
```

3. Seed the database (optional):

```bash
npm run docker:seed
```

## Example API Requests

### GraphQL API

The GraphQL playground is available at `http://localhost:3000/graphql`

Example queries:

```graphql
# Post-related queries and mutations
query {
  # Find all posts
  findPosts {
    id
    title
    content
    published
    createdAt
    author {
      id
      email
    }
    likes {
      id
    }
  }

  # Find post by ID
  findPostById(id: "post-id") {
    id
    title
    content
    published
    createdAt
    author {
      id
      email
    }
    likes {
      id
    }
  }

  # Get post likes count
  getPostLikesCount(postId: "post-id")
}

mutation {
  # Create a new post
  createPost(
    data: {
      title: "My First Post"
      content: "This is the content of my post"
      published: true
      authorId: "user-id"
    }
  ) {
    id
    title
    content
    published
    createdAt
    author {
      id
      email
    }
  }

  # Like a post
  likePost(postId: "post-id", userId: "user-id") {
    id
    post {
      id
      title
    }
    user {
      id
      email
    }
  }

  # Unlike a post
  unlikePost(postId: "post-id", userId: "user-id") {
    id
    post {
      id
      title
    }
    user {
      id
      email
    }
  }
}
```

## Assumptions and Shortcuts

1. **Database**: The project assumes PostgreSQL as the database. The connection string is configured in the `.env` file.

2. **Authentication**: JWT-based authentication is implemented with access and refresh tokens.

3. **GraphQL**: The project uses code-first approach for GraphQL schema definition.

4. **Docker**: The project includes Docker configurations for both development and production environments.

5. **Environment Variables**: Sensitive configuration is managed through environment variables with a `.env.example` template.

6. **Prisma**: The project uses Prisma's preview features for migrations and client generation.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
