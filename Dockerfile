# Stage 1: Build the frontend
FROM node:18 AS frontend-build

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy the frontend package.json and pnpm-lock.yaml
COPY frontend/package.json frontend/pnpm-lock.yaml ./

# Install pnpm and dependencies for the frontend
RUN npm install -g pnpm && pnpm install

# Copy all frontend files
COPY frontend .

# Build the frontend for production
RUN pnpm run build


# Stage 2: Setup and run backend with frontend built files
FROM node:18

# Set the working directory for the backend
WORKDIR /app

# Copy backend package.json and pnpm-lock.yaml
COPY backend/package.json backend/pnpm-lock.yaml ./

# Install pnpm and dependencies for the backend
RUN npm install -g pnpm && pnpm install

# Copy the backend source code
COPY backend .

# Copy the built frontend files from the previous stage
COPY --from=frontend-build /app/frontend/dist ./public

# Expose the backend port
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
