# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Copy .env file for build
COPY .env .env

# Build the application (Vite will read .env)
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files for serve command
COPY package*.json ./

# Install only production dependencies (if needed for serve)
RUN npm ci --omit=dev

# Copy built assets from build stage
COPY --from=build /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Start the preview server
CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0", "--port", "3000"]
